const { insertChannel, findChannelName, deleteChannel: deleteChannelService, updateChannel: updateChannelService } = require("../services/channelServices");

/* create=insert=post */
const postChannel = async (req, res) => {
    const { channel_Name, channel_Owner } = req.body;
    console.log(`channelName: ${channel_Name}, channelowner: ${channel_Owner}`)
    if (!channel_Name || !channel_Owner ) {
        return res.status(400).json({
            error: "Required fields are missing. The request must include channel_ID, channel_Name, and channel_Owner.",
        });
    }

    try {
        const newChannel = await insertChannel( channel_Name, channel_Owner);

        if ( newChannel ) {
            res.status(200).json({
                message: "Success! New channel created"
            });
        }

    } catch (error) {
        console.error("Could not add channel", error);
        res.status(500).send('Internal Server Error');
    }
};

/* read=find=get */
const getChannel = async (req, res) => {
    const channelName = req.params.channel_Name;

    try {
        const Channel = await findChannelName(channelName);

        if (Channel) {
            res.status(200).json(Channel);
        } else {
            res.status(404).send("Channel not found");
        }
    } catch (error) {
        console.error("Internal server error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

/* delete */
const deleteChannel = async (req, res) => {
    const id = req.body.channel_ID;
    try {
        await deleteChannelService(id);
        res.status(200).send('Channel deleted!');
    } catch (error) {
        res.status(500).send({ message: 'Internal server error', error: error });
    }
};

/* update */
const updateChannel = async (req, res) => {
    try {
        const { channel_Name, channel_Owner } = req.body;
        const { id: channel_ID } = req.params;

        await updateChannelService({ channel_ID, channel_Name, channel_Owner });

        res.status(200).send('Updated channel!');
    } catch (error) {
        res.status(500).send('Internal server Error');
    }
};

module.exports = {
    getChannel,
    postChannel,
    deleteChannel,
    updateChannel
};
