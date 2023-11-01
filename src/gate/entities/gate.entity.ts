import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Gate extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  //현재 고객
  @Column()
  count: number;

  //총 고객
  @Column()
  sum: number;

  @Column()
  day: number;

  //등록일
  @Column()
  date: Date;
}
