import { BadRequestException, Injectable } from '@nestjs/common';
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
    const transactionFound = await this.prisma.transaction.findUnique({
      where: {
        id,
      },
    });

    if (!transactionFound) {
      throw new BadRequestException(`Transaction with id ${id} not found`);
    }

    return transactionFound;
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto) {
    const updatedTransaction = await this.prisma.transaction.update({
      where: {
        id,
      },
      data: updateTransactionDto,
    });

    if (!updatedTransaction) {
      throw new BadRequestException(`Transaction with id ${id} not found`);
    }

    return updatedTransaction;
  }

  async remove(id: string) {
    const deletedTransaction = await this.prisma.transaction.delete({
      where: {
        id,
      },
    });

    if (!deletedTransaction) {
      throw new BadRequestException(`Transaction with id ${id} not found`);
    }

    return deletedTransaction;
  }
}
