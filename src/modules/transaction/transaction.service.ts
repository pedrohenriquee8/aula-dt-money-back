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

  async findAll(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const transactions = await this.prisma.transaction.findMany({
      skip,
      take,
      orderBy: {
        data: 'desc',
      },
    });

    if (!transactions || transactions.length === 0) {
      throw new BadRequestException('No transactions found');
    }

    const totalTransactions = await this.prisma.transaction.count();

    const totalPages = Math.ceil(totalTransactions / pageSize);

    return {
      data: transactions,
      total: totalTransactions,
      page,
      pageSize,
      totalPages,
    };
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
