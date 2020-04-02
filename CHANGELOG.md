## [7.1.13](https://github.com/kpfromer/nestjs-typegoose/compare/v7.1.12...v7.1.13) (2020-04-02)


### Bug Fixes

* **deps:** update dependency @docusaurus/core to v2.0.0-alpha.50 ([9709344](https://github.com/kpfromer/nestjs-typegoose/commit/9709344ea2bcde790a5820f5d7a55af64254173e))

## [7.1.12](https://github.com/kpfromer/nestjs-typegoose/compare/v7.1.11...v7.1.12) (2020-04-01)


### Bug Fixes

* **deps:** update dependency @docusaurus/preset-classic to v2.0.0-alpha.49 ([67af1bc](https://github.com/kpfromer/nestjs-typegoose/commit/67af1bc529b842ebd18927495e50e5bdd5dc1fc1))

## [7.1.11](https://github.com/kpfromer/nestjs-typegoose/compare/v7.1.10...v7.1.11) (2020-04-01)


### Bug Fixes

* **deps:** update dependency @docusaurus/core to v2.0.0-alpha.49 ([a320087](https://github.com/kpfromer/nestjs-typegoose/commit/a320087a8f3f34a2e2ba4ad0b3f018676a29b100))

## [7.1.10](https://github.com/kpfromer/nestjs-typegoose/compare/v7.1.9...v7.1.10) (2020-03-30)


### Bug Fixes

* **deps:** update dependency class-validator to v0.11.1 ([c3ec083](https://github.com/kpfromer/nestjs-typegoose/commit/c3ec08391bd0f2ad5c9c67da0e29a4c6636e39d3))

## [7.1.9](https://github.com/kpfromer/nestjs-typegoose/compare/v7.1.8...v7.1.9) (2020-03-28)


### Bug Fixes

* **deps:** update dependency nestjs-typegoose to v7.1.8 ([fc392ad](https://github.com/kpfromer/nestjs-typegoose/commit/fc392ad003f6c03d190d699374661dffcc77564d))

## [7.1.8](https://github.com/kpfromer/nestjs-typegoose/compare/v7.1.7...v7.1.8) (2020-03-28)


### Bug Fixes

* **deps:** update dependency nestjs-typegoose to v7.1.7 ([657a8f7](https://github.com/kpfromer/nestjs-typegoose/commit/657a8f726fe4c480ee82e3ff23d199573070c04e))

## [7.1.7](https://github.com/kpfromer/nestjs-typegoose/compare/v7.1.6...v7.1.7) (2020-03-28)


### Bug Fixes

* **deps:** update dependency nestjs-typegoose to v7.1.6 ([4177c5e](https://github.com/kpfromer/nestjs-typegoose/commit/4177c5ed223c6648d715370b1efe81f6b7fdb39a))

## [7.1.6](https://github.com/kpfromer/nestjs-typegoose/compare/v7.1.5...v7.1.6) (2020-03-28)


### Bug Fixes

* **deps:** update dependency nestjs-typegoose to v7.1.5 ([3cf1d0e](https://github.com/kpfromer/nestjs-typegoose/commit/3cf1d0ec8d9ea6ebef7a21ec0b4fbfc39638c8e7))

## [7.1.5](https://github.com/kpfromer/nestjs-typegoose/compare/v7.1.4...v7.1.5) (2020-03-28)


### Bug Fixes

* **deps:** update react monorepo to v16.13.1 ([2d38bef](https://github.com/kpfromer/nestjs-typegoose/commit/2d38bef8ed5705579f33802ea172d45a787be803))

## [7.1.4](https://github.com/kpfromer/nestjs-typegoose/compare/v7.1.3...v7.1.4) (2020-03-28)


### Bug Fixes

* **deps:** update dependency rimraf to v3.0.2 ([315710c](https://github.com/kpfromer/nestjs-typegoose/commit/315710c672f867e8e8472a6282101fb0c3167118))

## [7.1.3](https://github.com/kpfromer/nestjs-typegoose/compare/v7.1.2...v7.1.3) (2020-03-28)


### Bug Fixes

* **deps:** update dependency nestjs-typegoose to v7.1.2 ([22c7408](https://github.com/kpfromer/nestjs-typegoose/commit/22c740856e9708dc11fd676e54a6eaee8dc75a96))

## [7.1.2](https://github.com/kpfromer/nestjs-typegoose/compare/v7.1.1...v7.1.2) (2020-03-28)


### Bug Fixes

* **deps:** update dependency @typegoose/typegoose to v6.4.0 ([03d2eca](https://github.com/kpfromer/nestjs-typegoose/commit/03d2eca017bc662fdd6d195413a745fd2f9063aa))

## [7.1.1](https://github.com/kpfromer/nestjs-typegoose/compare/v7.1.0...v7.1.1) (2020-03-28)


### Bug Fixes

* **deps:** update dependency @docusaurus/core to v2.0.0-alpha.48 ([6a15f76](https://github.com/kpfromer/nestjs-typegoose/commit/6a15f768f490490198885b015e37be259ee2e7d2))

## [7.1.0] - 2020-2-11

### Added

- Mongoose Discriminators.

### Changed

- Updated peer dependency `@nestjs/common` from version `6.3.1` to `6.10.1`
- Updated peer dependency `@nestjs/core` from version `6.3.1` to `6.10.1`
- Updated peer dependency `@nestjs/core` from version `6.0.0` to `6.2.1`
- Updated peer dependency `mongoose` from version `5.5.13` to `5.8.4`

### Fixed

- Fixed typos in the documentation.
- Database shutdown behavior. (PR #54)
- Clear cache of typegoose. (PR #40)

## [7.0.0] - 2019-10-08

### Changed

- **BREAKING CHANGE**: `nest-typegoose` uses `@typegoose/typegoose` as a peer dependency instead of `@hasezoey/typegoose` now.

## [6.0.0] - 2019-09-29

### Changed

- **BREAKING CHANGE**: `nestjs-typegoose` uses `@hasezoey/typegoose` as a peer dependency instead of `typegoose` now.

## [5.2.0] - 2019-06-06

### Added

- Multiple database connections.

### Changed

- **BREAKING CHANGE:** models are no long spread for `forFeature`. For example:
  Before:

```typescript
@Module({
  imports: [TypegooseModule.forFeature(Cat, OtherModel)],
  controllers: [CatsController],
  providers: [CatsService]
})
export class CatsModule {}
```

After:

```typescript
@Module({
  imports: [TypegooseModule.forFeature([Cat, OtherModel])],
  controllers: [CatsController],
  providers: [CatsService]
})
export class CatsModule {}
```

### Fixed

- `TypegooseModule` will disconnect from the monodb server on module destruction.
