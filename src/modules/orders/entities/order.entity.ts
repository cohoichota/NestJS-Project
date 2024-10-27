import { OrderDetail } from 'src/modules/order-detail/entities/order-detail.entity';
import { Restaurant } from 'src/modules/restaurants/entities/restaurant.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'orders' }) // Optional: specify the table name
export class Order {
  @PrimaryGeneratedColumn()
  id: number; // Add an ID field as the primary key

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.orders, {
    eager: true,
  }) // Establish the relationship with Restaurant
  restaurant: Restaurant;

  @ManyToOne(() => User, (user) => user.orders, { eager: true }) // Establish the relationship with User
  user: User;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order) // Establish one-to-many relationship with Order-Detail
  orderDetails: OrderDetail[];

  @Column()
  status: string;

  @Column({ type: 'decimal' }) // Use decimal for monetary values
  totalPrice: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) // Store order time
  orderTime: Date;

  @Column({ type: 'timestamp', nullable: true }) // Allow nullable delivery time
  deliveryTime: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  }) // Optional: timestamp for updates
  updatedAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) // Optional: timestamp for creation
  createdAt: Date;
}
