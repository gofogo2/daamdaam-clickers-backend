import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GateModule } from './gate/gate.module';
import { Gate } from './gate/entities/gate.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: '127.0.0.1',
      port: 1433,
      username: 'gofogo',
      password: '1',
      database: 'test',
      entities: [Gate],
      synchronize: true,
      options: { encrypt: false },
    }),
    GateModule,
  ],
})
export class AppModule {}
