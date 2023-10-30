//Sebastian Donoso - Lenin Montalvo

import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductEntity } from './products.entity';

@Entity('categories', { schema: 'categorias' })
export class CategoryEntity {
  @PrimaryColumn('uuid')
  id: string;

  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamp',
    default: () => 'Current_timestamp',
  })
  createAt: Date;

  @UpdateDateColumn({
    name: 'update_At',
    type: 'timestamp',
    default: () => 'Current_timestamp',
  })
  updateAt: Date;

  @DeleteDateColumn({
    name: 'delete_At',
    type: 'timestamp',
    nullable: false,
  })
  deleteAt: Date;

  // Relaciones
  @OneToMany(() => ProductEntity, (product) => product.category)
  product: ProductEntity;
  //----------

  @Column('varchar', {
    name: 'name',
    nullable: false,
    comment: 'Category name',
  })
  name: string;

  @Column('varchar', {
    name: 'description',
    nullable: false,
    comment: 'description',
  })
  description: string;


  @BeforeInsert()
  @BeforeUpdate()
  async setName() {
    if (!this.name) {
      return;
    }
    this.name = this.name.toUpperCase();
  }
}
