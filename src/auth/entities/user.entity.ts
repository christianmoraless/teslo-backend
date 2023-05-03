import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/products/entities';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ type: 'text', unique: true })
  email: string;

  @ApiProperty()
  @Column({ type: 'text', select: false })
  password: string;

  @ApiProperty()
  @Column({ type: 'text' })
  fullName: string;

  @ApiProperty()
  @Column({ type: 'bool', default: true })
  isActive: boolean;

  @ApiProperty()
  @Column({ type: 'text', array: true, default: ['user'] })
  roles: string[];

  @OneToMany(() => Product, (product) => product.user)
  product: Product;

  @BeforeInsert()
  checkfieldsBeforeInsert() {
    this.email = this.email.toLocaleLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkfieldsBeforeInsert();
  }
}
