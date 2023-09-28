## Teddie and Monster - Backend

#### Reference

- [Project Document (Github)](https://gist.github.com/andasan/97312cf4f82cfac9362437078d839b40)
- Frontend Repo (coming soon...)

#### Setting Up

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Docker in VScode ](https://code.visualstudio.com/docs/containers/overview)

#### Getting Started

First, download (or clone) the main branch.
Make sure to create `.env` and add variables.

- STEP1: Install the `Docker in VScode`
- STEP2: Right click the `docker-compose.yml` file, select `Compose Up` from the options.
- STEP3: Make sure your container is running. (The icon turns into green). Go to `http://localhost:1337` and start editing.

- When you want to stop running the application, right click the container (teddies_back) and select `Compose stop`. When you want to start the application (= npm run develop), right click the container and select `Compose start`.
- ##### Note that when you change the database schema, you need to reset the container (`Compose Down`), and build that again. (`Compose Up`). In that case your database are completely cleared.

#### Branch

Follow the naming convention below.

```bash
feat_hogehoge
fix_hogehoge
docs_hogehoge
style_hogehoge
refactor_hogehoge
test_hogehoge
chore_hogehoge
```

#### Commit

Follow the convention below. Learn more about it [HERE](https://dev.to/chrissiemhrk/git-commit-message-5e21)

```bash
feat: a new feature
fix: a bug fix
docs: changes in documentation
style: everything related to styling
refactor: code changes that neither fixes a bug or adds a feature
test: everything related to testing
chore: updating build tasks, package manager configs, etc
```

#### PR

Follow the format below.

```bash
## Main Proposed Changes
Create Home page
#### Code changes
- Create homepage
- Set Routes
- Create Header and Footer components
- Add a global state ( dark & Light theme ) by using redux toolkit
#### Related Issues
- URL(figma, trello...)
## Screen Cast
- Screen shot(as needed)
```

#### Git Tips

- Never code on master/main
- Never force push master/main
- Merge conflicts happens. There are ways of minimizing them but you can neve get rid of them completely.
- Use branches and pull requests

1. Create a branch ->
2. Work on the branch ->
3. Make a commit ->
4. Push to remote branch ->
5. Make a pull request ->
6. Checkout to master/main ->
7. Pull ->
8. Checkout to the branch ->
9. Merge master/main ->
10. Fix conflicts ->
11. Commit ->
12. Push ->
13. Merge pull request
