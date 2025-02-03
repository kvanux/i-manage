-- CreateTable
CREATE TABLE "Transactions" (
    "id" SERIAL NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "amount" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "paymentMethod" VARCHAR(50),
    "referenceNo" VARCHAR(200),

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("id")
);
