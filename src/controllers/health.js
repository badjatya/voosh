export const getHealthCheck = async (req, res) => {
	res.status(200).json({ success: true, message: "Hello World" });
};
