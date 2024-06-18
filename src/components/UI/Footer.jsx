export default function Footer() {
  return (
    <footer className="bg-[#395756] h-[56px] mt-5 py-6 text-center w-full p-5 text-white dark:bg-[#10192E]">
      <div className="flex justify-center items-center w-full h-full">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Notes. All rights reserved to Mor
          Hakak
        </p>
      </div>
    </footer>
  );
}
