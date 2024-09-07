-- DropIndex
DROP INDEX "Task_order_deadline_idx";

-- CreateIndex
CREATE INDEX "Task_order_idx" ON "Task"("order");

-- CreateIndex
CREATE INDEX "Task_deadline_idx" ON "Task"("deadline");
