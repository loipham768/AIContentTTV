import Image from "next/image";

interface Props {
  bankId: string;
  accountNumber: string;
  accountHolder: string;
  amount: number;
  transferContent: string;
}

export default function BankQRCode({
  bankId,
  accountNumber,
  accountHolder,
  amount,
  transferContent,
}: Props) {
  const qrUrl =
    `https://img.vietqr.io/image/${bankId}-${accountNumber}-compact2.png` +
    `?amount=${amount}` +
    `&addInfo=${encodeURIComponent(transferContent)}` +
    `&accountName=${encodeURIComponent(accountHolder)}`;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="rounded-2xl border border-indigo-100 bg-white p-3 shadow-sm">
        <Image
          src={qrUrl}
          alt="Mã QR chuyển khoản"
          width={220}
          height={220}
          unoptimized
          priority
        />
      </div>
      <p className="text-xs text-gray-400 text-center">
        Quét bằng app ngân hàng để chuyển khoản nhanh chóng, hoặc chuyển khoản
        thủ công với nội dung chuyển khoản bên dưới. Hệ thống sẽ tự động xác
        nhận sau khi nhận được tiền.
      </p>
    </div>
  );
}
