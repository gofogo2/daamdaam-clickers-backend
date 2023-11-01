import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GateModule } from './gate/gate.module';
import { Gate } from './gate/entities/gate.entity';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
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
  providers: [PrismaService],
})
export class AppModule {}
