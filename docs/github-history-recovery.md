# Recovering from oversized files in Git history

GitHub blocks any push containing a file larger than **100 MB** — even if
the file was deleted in a later commit. The blob still lives in history,
so the push is rejected with:

```
remote: error: File X is NNN MB; this exceeds GitHub's file size limit of 100 MB
```

If the Lovable → GitHub sync fails with this error, follow the steps below.

---

## Option A — Disconnect & reconnect to a fresh repo (fastest, recommended)

This is the only fully self-serve fix from inside Lovable. It pushes only
the **current snapshot** of your project, leaving the bloated history
behind.

1. In the Lovable chat, open the **+** menu (bottom-left of the chat input).
2. Click **GitHub → Disconnect**.
3. Open the **+** menu again → **GitHub → Connect project**.
4. Choose your GitHub account/org and click **Create Repository**.
   - Use a **new** repository name (e.g. `abcplace-clean`) — do not reuse the broken one.
5. Wait for the initial sync to complete. Confirm the new repo on GitHub
   contains your latest code and **no** files over 100 MB.
6. Archive or delete the old repository on GitHub once you've verified the
   new one is healthy.

After reconnecting, run `npm run check:large-files` locally to confirm
nothing oversized remains in the working tree.

---

## Option B — Rewrite history locally with BFG

Use this if you must keep the existing repository URL.

Requires: a local clone, Java, and `bfg` (https://rtyley.github.io/bfg-repo-cleaner/).
You will also need force-push permission on the remote.

```bash
git clone --mirror git@github.com:<owner>/<repo>.git
cd <repo>.git

bfg --strip-blobs-bigger-than 100M

git reflog expire --expire=now --all
git gc --prune=now --aggressive
git push --force
```

Then in Lovable: disconnect GitHub and reconnect to the same repo so the
sync re-syncs against the rewritten history.

> Force-pushing rewrites SHAs. Anyone with an existing clone must re-clone.

---

## Option C — Contact Lovable support

If neither option above is workable, contact Lovable support and ask them
to purge specific large blobs from the project's Git history. Provide the
file paths and approximate sizes.

---

## Preventing this in future

This repo ships two guardrails:

- **`scripts/check-large-files.sh`** — runs in `.husky/pre-commit` and
  `.husky/pre-push`, blocking any file > 100 MB before it reaches GitHub.
- **`scripts/optimize-hero-video.sh`** — compresses hero MP4s to a
  web-friendly size (target < 10 MB). Run via:

  ```bash
  npm run media:hero -- ~/Downloads/raw-hero.mp4
  ```

Always run the optimizer on raw exports before adding them to `public/video/`.