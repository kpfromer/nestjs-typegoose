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
