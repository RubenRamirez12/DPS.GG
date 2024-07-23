import LOLSidebar from "./LOLSidebar";
import "./LOLMain.css"

export default function LOLMain() {
  return (
    <div className="lol-main__main">
      <div className="lol-main__sidebar">
        <LOLSidebar />
      </div>
      <div className="lol-main__content">
        <input type="text" placeholder="enter username" />
      </div>
    </div>
  );
}
