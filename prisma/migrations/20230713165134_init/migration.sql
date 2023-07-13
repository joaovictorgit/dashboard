-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
