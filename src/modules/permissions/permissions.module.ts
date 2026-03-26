import { Module } from '@nestjs/common';
import { PermissionsFactory } from 'src/modules/permissions/permissions';

@Module({
  providers: [PermissionsFactory],
  exports: [PermissionsFactory],
})
export class PermissionsModule {}
