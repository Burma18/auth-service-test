import { Column, Entity } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";

@Entity()
export class Value {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  value: string;

  @Column("timestamptz")
  expires_at: Date;

  @Column()
  userId: string;
}
