import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GateModule } from './gate/gate.module';
import { Gate } from './gate/entities/gate.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'sa',
      password: 'p@ssw0rd!',
      database: 'cks_vip',
      entities: [Gate],
      synchronize: true,
      options: { encrypt: false },
    }),
    GateModule,
  ],
})
export class AppModule {}
