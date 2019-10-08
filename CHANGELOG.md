# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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