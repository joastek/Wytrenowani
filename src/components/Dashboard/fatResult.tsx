import { FiSmile } from "react-icons/fi";
import { PiSmileyMeh } from "react-icons/pi";
export function goodResult() {
  return (
    <>
      <FiSmile className="text-green-500 h-48 w-48" />
    </>
  );
}
export function neutralResult() {
  return (
    <>
      <PiSmileyMeh className="text-yellow-500 h-48 w-48" />
    </>
  );
}

export function sadResult() {
  return (
    <>
      <PiSmileyMeh className="text-rose-900 h-48 w-48" />
    </>
  );
}
