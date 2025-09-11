import * as React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import QRCode from "react-qr-code";
import Typography from "@mui/material/Typography";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "none",
    outline: "none",
    borderRadius: "12px",
    boxShadow: 24,
    maxWidth: "700px",
    width: "95%",
    maxHeight: "95vh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
};

export default function VacancyModal({ showQR, setShowQR, toTitleCase }) {
    const handleClose = () => setShowQR(null);

    React.useEffect(() => {
        if (showQR) {
            const scrollbarWidth =
                window.innerWidth - document.documentElement.clientWidth;
            document.body.style.paddingRight = `${scrollbarWidth}px`;
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.paddingRight = "";
            document.body.style.overflow = "";
        }
    }, [showQR]);

    return (
        <Modal
            open={!!showQR}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{ backdrop: { timeout: 500 } }}
            disableScrollLock
        >
            <Fade in={!!showQR}>
                <Box sx={style}>
                    <div className="flex justify-between px-4 py-3 bg-white sticky top-0 z-10">
                        <Typography
                            variant="h6"
                            component="h2"
                            className="flex-1 pr-4 leading-snug"
                        >
                            <span className="uppercase">{showQR?.title}</span> –{" "}
                            <span>
                                {toTitleCase(showQR?.company?.name || "")}
                            </span>
                        </Typography>
                        <svg
                            fill="#074797"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            onClick={handleClose}
                            className="cursor-pointer hover:scale-110 transition self-start mt-1"
                        >
                            <path d="M4.293,18.293,10.586,12,4.293,5.707A1,1,0,0,1,5.707,4.293L12,10.586l6.293-6.293a1,1,0,1,1,1.414,1.414L13.414,12l6.293,6.293a1,1,0,1,1-1.414,1.414L12,13.414,5.707,19.707a1,1,0,0,1-1.414-1.414Z"></path>
                        </svg>
                    </div>

                    {/* Scrollable Content */}
                    <div
                        className="overflow-y-auto p-4"
                        style={{ maxHeight: "calc(95vh - 64px)" }}
                    >
                        {/* Details */}
                        <div
                            className="text-sm text-left text-gray-700 mb-4"
                            dangerouslySetInnerHTML={{
                                __html: showQR?.details,
                            }}
                        />

                        {/* QR Code */}
                        <div className="flex flex-col mt-10 items-center">
                            <QRCode
                                value={`https://workinilocosnorte.ph/jobs/search?vacancyId=${showQR?.id}`}
                                size={130}
                            />
                            <p className="mt-2 text-center text-sm text-gray-600">
                                Scan the QR Code to apply or for more
                                information, please visit us at the <br />
                                <span className="font-semibold">
                                    Public Employment Services Office
                                </span>
                                <br />
                                West Wing, Capitol Building, Laoag City
                            </p>
                        </div>
                    </div>
                </Box>
            </Fade>
        </Modal>
    );
}
