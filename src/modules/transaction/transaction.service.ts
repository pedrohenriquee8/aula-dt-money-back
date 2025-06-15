/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}
  async create({ category, data, price, title, type }: CreateTransactionDto) {
    const createdTransaction = await this.prisma.transaction.create({
      data: {
        title,
        category,
        data,
        price,
        type,
      },
    });

    return createdTransaction;
  }

  async findAll() {
    const transactions = await this.prisma.transaction.findMany({
      orderBy: {
        data: 'desc',
      },
    });

    return transactions;
  }

  async findOne(id: string) {
    const transaction = await this.prisma.transaction.findUnique({
      where: {
        id,
      },
    });

    return transaction;
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto) {
    const updatedTransaction = await this.prisma.transaction.update({
      where: {
        id,
      },
      data: updateTransactionDto,
    });

    return updatedTransaction;
  }

  async remove(id: string) {
    const deletedTransaction = await this.prisma.transaction.delete({
      where: {
        id,
      },
    });

    return deletedTransaction;
  }
}
