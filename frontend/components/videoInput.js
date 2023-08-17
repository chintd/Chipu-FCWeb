import React from "react";

export default function VideoInput(props) {
  const { width, height } = props;

  const inputRef = React.useRef();

  const [source, setSource] = React.useState();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setSource(url);
  };

  const handleChoose = (event) => {
    inputRef.current.click();
  };

  return (
    <div className="VideoInput">
        <div className="VideoInput_infoForm">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name='title'></input>
            <label htmlFor="img">Image URL</label>
            <input type="text" id="img" name='img'></input>
            {/* <label htmlFor="price">Price</label>
            <input type="number" id="price" name='price'></input> */}
            <label htmlFor="des">Description</label>
            <textarea type="text" id="des" name='des' rows="8"></textarea>
            
            <button className="upload-btn" type="submit">Upload </button>
        </div>
        <div className="VideoInput_video">
            <input
                ref={inputRef}
                className="VideoInput_input"
                type="file"
                onChange={handleFileChange}
                accept=".mov,.mp4"
                name="video"
            />
            {!source && <button className="btn" onClick={handleChoose}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" />
                        </svg><p>Chọn Tệp</p></button>}
            {source && (
                <video
                className="VideoInput_video"
                width="100%"
                height={height}
                controls
                src={source}
                />
            )}
            <div className="VideoInput_footer">{source || "Nothing selectd"}
            </div>
        </div>
        {/* <p className="text-center">"Khi gửi video lên YouTube, bạn xác nhận rằng bạn đồng ý với Điều khoản dịch vụ và Nguyên tắc cộng đồng của YouTube.

Bạn cần đảm bảo không vi phạm bản quyền hoặc quyền riêng tư của người khác. Tìm hiểu thêm</p> */}
    </div>
  );
}
