# Creating a new release

These are the steps:
```bash
# Set and replace the version you need to tag and deploy
VERSION='v0.1.x'

# Checked out into develop branch
git checkout dev
 
# Fetched all remote updates
git remote update
 
# Update local develop branch with remote copy
git pull origin dev
 
# Created a release branch that tracks origin/develop
git checkout -b release/$VERSION origin/dev
 
# Pushed release branch to remote repository
git push origin release/$VERSION
 
# Opened a "pull request" in GitHub for team to verify the release
 
# Checkout into main branch
git checkout main
 
# Updated local main branch with remote copy
git pull origin main
 
# Merged release branch into main branch
git merge release/$VERSION
 
# Tagged the release point by creating a new tag
git tag -a $VERSION -m "Create release tag $VERSION"
 
# Pushed main branch to remote repository
git push origin main
 
# Pushed the tags to remote repository
git push origin --tags
 
# Checkout into develop branch
git checkout dev
 
# Merged release branch into develop branch
git merge release/$VERSION
 
# Pushed develop branch to remote repository
git push origin dev
 
# Removed release branch from the local repository
git branch -D release/$VERSION
 
# Removed release branch from the remote repository
git push origin :release/$VERSION
```
