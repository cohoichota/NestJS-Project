// src/modules/menus/menu.entity.ts
import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { OrderDetail } from 'src/modules/order-detail/entities/order-detail.entity';
import { Restaurant } from 'src/modules/restaurants/entities/restaurant.entity';
import { MenuItem } from 'src/modules/menu-items/entities/menu-item.entity';

@Entity({ name: 'menus' }) // Optional: specify the table name
export class Menu {
  @PrimaryGeneratedColumn()
  id: number; // Add an ID field as the primary key

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.menus, {
    eager: true,
  }) // Establish the relationship
  restaurant: Restaurant;

  @OneToMany(() => OrderDetail, (order) => order.menu) // Establish one-to-many relationship with Order-Detail
  orderDetails: OrderDetail[];

  @OneToMany(() => MenuItem, (menuItem) => menuItem.menu) // Establish one-to-many relationship with MenuItem
  items: MenuItem[];

  @Column({ nullable: false }) // Specify that this field is required
  title: string;

  @Column({ nullable: true }) // Allow nullable values for optional fields
  description: string;

  @Column({ nullable: true }) // Allow nullable values for optional fields
  image: string;

  // If you want to include timestamps, add these fields:
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
