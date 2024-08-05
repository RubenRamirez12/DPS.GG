import LOLSidebar from "./LOLSidebar";
import LOLSearch from "./LOLSearch";
import "./LOLMain.css"

export default function LOLMain() {
  return (
    <div className="lol-main__main">
      <div className="lol-main__sidebar">
        <LOLSidebar />
      </div>
      <div className="lol-main__content">
        <LOLSearch/>
      </div>
    </div>
  );
}
