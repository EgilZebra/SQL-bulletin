const { unsubToChannel,subToChannel,GetChannelbyID, insertChannel, findChannelName, deleteChannel: deleteChannelService  } = require("../services/channelServices");

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
    const { channel_Name, channel_Owner } = req.body;
    const { id: channel_ID } = req.params;

    try {
        
        // const result = await updateChannelService( channel_ID, channel_Name, channel_Owner );
        if ( await updateChannelService( channel_ID, channel_Name, channel_Owner ) ) {
            res.status(200).send('Updated channel!');
        } else {
            res.status(400).send('faulty request')
        }
        
    } catch (error) {
        res.status(500).send('Internal server Error');
    }
};

const SubscriptionToChannel = async (req, res) => {
    const { channel_ID, user_ID, action } = req.body;

    if (!(channel_ID && user_ID && action)) {
        return res.status(400).json({ error: "Channel ID, user ID, and action must be provided" });
    }

    try {
        const channelExists = await GetChannelbyID(channel_ID);
        if (!channelExists) {
            return res.status(404).json({ error: 'Channel does not exist' });
        }

        if (action === 'subscribe') {
            const result = await subToChannel(channel_ID, user_ID);
            if ( result ) {
                res.status(200).json({ status: "SUCCESS", message: "Subscribed to channel successfully" });
            } else {
                res.status(400).json({ status: 'Fail', message: 'Already subscribed'})
            }
        } else if (action === 'unsubscribe') {
            await unsubToChannel(channel_ID, user_ID);
            res.status(200).json({ status: "SUCCESS", message: "Unsubscribed from channel successfully" });
        } else {
            return res.status(400).json({ error: 'Wrong action' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal server error');
    }
};


module.exports = {
    getChannel,
    postChannel,
    deleteChannel,
    updateChannel,
    SubscriptionToChannel
};