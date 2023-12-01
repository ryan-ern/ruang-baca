const StatusBadge = ({ status }) => {
    let badgeColor = "";
    let badgeText = "";
    let textColor = "";

    switch (status) {
    case "PROSES":
        badgeColor = "#fbe1a7"; // Warna untuk status pending
        badgeText = status;
        textColor = "#B78820"; // Teks untuk status pending
        break;
    case "SUKSES":
        badgeColor = "#C9F7F5"; // Warna untuk status approved
        badgeText = status;
        textColor = "#1BC5BD"; // Teks untuk status approved
        break;
    case "sukses":
        badgeColor = "#C9F7F5"; // Warna untuk status approved
        badgeText = status;
        textColor = "#1BC5BD"; // Teks untuk status approved
        break;
    case "DITOLAK":
        badgeColor = "#F09696"; // Warna untuk status rejected
        badgeText = status;
        textColor = "#5E3C3C"; // Teks untuk status rejected
        break;
    case "rejected-b":
        badgeColor = "#F09696"; // Warna untuk status rejected
        badgeText = "PENDING";
        textColor = "#5E3C3C"; // Teks untuk status rejected
        break;
    default:
        badgeColor = "gray"; // Warna default jika status tidak dikenali
        badgeText = "-"; // Teks default jika status tidak dikenali
        break;
    }

    const badgeStyle = {
        backgroundColor: badgeColor,
        fontWeight: "500",
        fontSize: "smaller",
        color: textColor,
        padding: "5px 10px",
        borderRadius: "4px",
    };

    return <span style={badgeStyle}>{badgeText}</span>;
};

export default StatusBadge;
