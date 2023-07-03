const MyButton = ({ text, type, onClick }) => {
    // type이 'positive', 'negative' 외에 다른 것이 들어오면 모두 'default'로 설정
    const btnType = ["positive", "negative"].includes(type) ? type : "default";

    return (
        <button className={["MyButton", `MyButton_${btnType}`].join(" ")} onClick={onClick}>
            {text}
        </button>
    )
}

MyButton.defaultProps = {
    type: "default"
}

export default MyButton;