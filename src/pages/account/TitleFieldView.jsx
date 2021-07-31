import { memo } from "react";
function TitleFieldView({
  title,
  renderLeftView,
  renderRightView,
  ...inputProps
}) {
  return (
    <div className="TitleFieldView flex-center w-100">
      <div className="title-div d-flex justify-content-end">
        {renderLeftView ? renderLeftView() : title}
      </div>
      <div className="field-div flex-grow-1">
        {renderRightView ? renderRightView() : <input {...inputProps} />}
      </div>
    </div>
  );
}

export default memo(TitleFieldView);
