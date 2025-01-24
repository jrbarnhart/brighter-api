-- CreateTable
CREATE TABLE "_DropTableToMiscItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_DropTableToMiscItem_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_DropTableToMiscItem_B_index" ON "_DropTableToMiscItem"("B");

-- AddForeignKey
ALTER TABLE "_DropTableToMiscItem" ADD CONSTRAINT "_DropTableToMiscItem_A_fkey" FOREIGN KEY ("A") REFERENCES "DropTable"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DropTableToMiscItem" ADD CONSTRAINT "_DropTableToMiscItem_B_fkey" FOREIGN KEY ("B") REFERENCES "MiscItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
