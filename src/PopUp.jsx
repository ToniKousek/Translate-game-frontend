import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

function PopUp({ popUpData, setPopUpData }) {
  function getStyle() {
    return popUpData.wasSuccess ? { color: "#008000" } : { color: "#8B0000" };
  }

  return (
    <Popup
      open={popUpData.openPopUp}
      trigger={
        <div
          onClick={() => {
            console.table(popUpData);
          }}
          style={{ height: 100 }}
        ></div>
      }
      position="center center"
      onClose={() =>
        setPopUpData({ ...popUpData, openPopUp: false, otherData: "" })
      }
      on={[]}
      contentStyle={{
        textAlign: "center",
        width: "fit-content",
      }}
      arrow={false}
    >
      <p style={getStyle()}>
        {popUpData.wasSuccess
          ? "You are correct! It was " +
            popUpData.correctLanguage.charAt(0).toUpperCase() +
            popUpData.correctLanguage.slice(1)
          : "Wrong! It was " +
            popUpData.correctLanguage.charAt(0).toUpperCase() +
            popUpData.correctLanguage.slice(1)}
      </p>
      <p dangerouslySetInnerHTML={{ __html: popUpData.otherData }}></p>
    </Popup>
  );
}
export default PopUp;
