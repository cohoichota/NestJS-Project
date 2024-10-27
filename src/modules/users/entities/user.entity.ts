import { Order } from 'src/modules/orders/entities/order.entity';
import { Review } from 'src/modules/reviews/entities/review.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Review, (review) => review.user) // Establish one-to-many relationship with Review
  reviews: Review[];

  @OneToMany(() => Order, (order) => order.user) // Establish one-to-many relationship with Order
  orders: Order[];

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false, select: false })
  password: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  role: string;

  @Column({ nullable: true })
  accountType: string;

  @Column({ default: false })
  isActive: boolean;

  @Column({ nullable: true })
  codeId: string;

  @Column({ nullable: true })
  codeExpired: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
