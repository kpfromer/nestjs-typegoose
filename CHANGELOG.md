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
