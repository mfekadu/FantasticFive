# Group5

## A single-page webapp for a bike shop.

## Documentation
* [All docs][shared_gdrive]
* [Wireframe Doc][wireframe]
* [Requirements Doc][requirements]
* Acceptence Testing Doc

## Contribution Guidelines
* It's a good idea to make a new branch off of [`dev`][dev_link] with your `username + feature` to avoid merge conflicts (see ["Git Flow"][gitflow] for more info)
  * Once the code is done, [make a new pull request](https://github.com/CSC307Winter2019/Group5/pulls)

## Useful Git Info
* ["Git Flow"][gitflow]
* [Git cheat sheet][gitbasics]

* cool commands
```
git branch
git branch -vv
git checkout -b '<branch_name>'
git pull professor master
```

## Collaborators:

* __Team Lead__: Michael Fekadu ([mfekadu][mfekadu])
* __Database Lead__: Suhas Panthari ([english13][english13])
* __UI Lead__: Angaddeep Bains ([angaddeep][angaddeep])
* __Testing Lead / QA__: Johnathan Fisher ([jlfisher][jlfisher])
* __Architect__: Zach Westfall ([ztwestfall][ztwestfall])

## Getting Started

inside root directory (above /api and /client)

* `docker-compose up`

get client running (inside /client directory)

* `npm run serve`

get the backend running (inside /api directory)

* `npm run dev`

### Useful Tidbits
* rename `config.json.example` to `config.json`
* create database dev;
* create database test;

## Useful diagram

```
++++++++++++++
|    Vue     |
++++++++++++++
|    API     |
++++++++++++++
|  database  |
++++++++++++++
```

[//]: # (username links)

[english13]: https://github.com/english13
[jlfisher]: https://github.com/jlfisher
[ztwestfall]: https://github.com/ztwestfall
[angaddeep]: https://github.com/angaddeep
[mfekadu]: https://github.com/mfekadu

[//]: # (useful git links)

[gitbasics]: http://rogerdudler.github.io/git-guide/
[gitflow]: https://nvie.com/posts/a-successful-git-branching-model/

[//]: # (misc)

[shared_gdrive]: https://drive.google.com/drive/u/0/folders/1kT1bq_aAEvqXJfDculGMjT0Cxi3J-3IB

[wireframe]: https://drive.google.com/open?id=1RiFUKtNt0i6gadxtpuz12RtlToLHqjBY
[requirements]: https://docs.google.com/document/d/1GLAbqnLXSJi8diQ_CJmz5hnz5zkAz6_TDh62P7a9_Ss/edit#heading=h.rv6hsfad8zu2

[dev_link]: https://github.com/CSC307Winter2019/Group5/tree/dev
