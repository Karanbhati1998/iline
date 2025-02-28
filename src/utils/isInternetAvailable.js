import { toastService } from "./toastify";

export function checkInternetStatus() {
  console.log({ internet: " outside internat is not working" });
  window.addEventListener("offline", () => {
    console.log({ internet: "internat is working" });
    toastService.error("❌ No internet connection!");
  });
  window.addEventListener("online", () => {
    console.log({ internet: "not working internat" });

    toastService.success("✅ Internet is back!");
  });
}
