// ============================================================
// BlancoCountyRP | Whitelisted
// Discord Bot
// Built by a Vision. Driven by Roleplay.
// ============================================================

import 'dotenv/config';

import {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  SlashCommandBuilder,
  ActivityType,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  ChannelType,
  PermissionFlagsBits,
  MessageFlags,
  ContainerBuilder,
  TextDisplayBuilder,
  MediaGalleryBuilder
} from 'discord.js';

// ============================================================
// BASIC CONFIGURATION
// ============================================================

const BOT_NAME = 'BlancoCountyRP | Whitelisted';
const SERVER_NAME = 'BlancoCountyRP | Whitelisted';

const BRAND_COLOR = 0xFFFFFF;

const LOGO_URL =
  'https://cdn.discordapp.com/emojis/1551061782338994197.webp?size=256';

const DISCORD_INVITE =
  'https://discord.gg/ynveZvRNdq';

const MOTTO =
  'Built by a Vision. Driven by Roleplay.';

const STATUS =
  'Under Development';

const ABOUT_TEXT =
  'Welcome to the start of **Blanco County, Texas**, made by a deputy who has a vision to create good-quality roleplays within his county! We seek a community that is looking to be a part of something new and great!';

// ============================================================
// GLOBAL IMAGES
//
// Add your image URLs later.
// Every visual panel supports:
// TOP BANNER
// CONTENT
// BOTTOM IMAGE
// ============================================================

const TOP_BANNER_URL = '';
const BOTTOM_FOOTER_URL = '';

// ============================================================
// VERIFICATION
// ============================================================

const VERIFIED_ROLE_ID = '';

const VERIFICATION_SUPPORT_CHANNEL_ID =
  '1551088269767344268';

const VERIFICATION_BANNER_URL = '';
const VERIFICATION_BOTTOM_IMAGE_URL = '';

// ============================================================
// TICKET CONFIGURATION
// ============================================================

const TICKET_CATEGORY_ID = '';

const SERVER_STAFF_ROLE_ID = '';
const SERVER_MANAGEMENT_ROLE_ID = '';
const PARTNERSHIP_TEAM_ROLE_ID = '';

const COMMUNITY_MEMBER_ROLE_ID = '';

const TICKET_TRANSCRIPT_CHANNEL_ID = '';
const TICKET_FEEDBACK_CHANNEL_ID = '';

const TICKET_BANNER_URL = '';
const TICKET_BOTTOM_IMAGE_URL = '';

// ============================================================
// TICKET SUBJECTS
// ============================================================

const TICKET_SUBJECTS = {

  general_support: {

    label: 'General Support',

    description:
      'Support which cannot be answered within general.',

    channelName:
      '{user}-general-support',

    staffRoles: [
      SERVER_STAFF_ROLE_ID
    ].filter(Boolean),

    message:
      '**General Support**\n\n' +

      'Do not ping support staff, remain respectful at all times.\n\n' +

      '**Basic Format:**\n\n' +

      '**Discord Name:**\n' +
      '**Assistance Reason:**\n' +
      '**Extra Notes/Concerns:**\n\n' +

      'Please follow this format and a team member will get to you as soon as possible.\n\n' +

      '**Please Read This**\n' +
      'Please do not open a ticket about partnering with us or merging. ' +
      'The ticket will be closed if so.\n\n' +

      '*BlancoCountyRP*\n' +
      '*Director G. McCoy*'
  },

  management_support: {

    label: 'Management Support',

    description:
      'For support which needs to be handled by management.',

    channelName:
      '{user}-management-support',

    staffRoles: [
      SERVER_MANAGEMENT_ROLE_ID,
      PARTNERSHIP_TEAM_ROLE_ID
    ].filter(Boolean),

    message:
      '**Management Support**\n\n' +

      'Do not ping management staff, remain respectful at all times.\n\n' +

      '**Basic Format:**\n\n' +

      '**Discord Name:**\n' +
      '**Assistance Reason:**\n' +
      '**Extra Notes/Concerns:**\n\n' +

      'Please follow this format and a management team member will get to you as soon as possible.\n\n' +

      '**Please Read This**\n' +
      'Please do not open a ticket about partnering with us or merging. ' +
      'The ticket will be closed if so.\n\n' +

      '*BlancoCountyRP*\n' +
      '*Director G. McCoy*'
  }
};

// ============================================================
// DISCORD REGULATIONS
// ============================================================

const DISCORD_REGULATIONS_TEXT =
  '**Discord Guidelines:**\n' +
  'By joining, you agree to follow: ➤ [Discord Terms of Service](https://discord.com/terms) ➤ [Discord Community Guidelines](https://discord.com/guidelines)\n\n' +

  '**1 Respect**\n' +
  'Treat all members respectfully. No harassment, hate speech, or discrimination.\n' +

  '**2 Common Sense**\n' +
  'Use good judgment. Do not spam, troll, or provoke arguments.\n' +

  '**3 NSFW / Inappropriate Content**\n' +
  'No adult, gory, or offensive content. This applies to messages, avatars, and nicknames.\n' +

  '**4 Voice Chat Rules**\n' +
  'No mic spam, soundboards, or disruptive behavior - this will result in a VC ban.\n' +

  '**5 Impersonation**\n' +
  'Do not impersonate staff, bots, or other members.\n' +

  '**6 Advertising**\n' +
  'No advertising external servers, products, or services without permission.\n' +

  '**7 Malicious Content**\n' +
  'No viruses, scripts, or suspicious links. Respect community safety.\n' +

  '**8 Staff Instructions**\n' +
  'Follow directions given by staff, do not argue with staff decisions in public channels.\n\n' +

  '**Moderation System**\n' +
  '• Warnings → Minor Infractions\n' +
  '• Mutes → Failing to listen to staff or continuing arguments\n' +
  '• Kicks → Moderate or repeated violations\n' +
  '• Bans → Severe violations\n\n' +

  '**9 Name Rules**\n' +
  'Usernames must be your Roblox username.\n' +

  '**10 Channel Usage**\n' +
  'Use channels for their intended purpose. Do not derail conversations or flood chats.\n' +

  '**11 Bot Usage**\n' +
  'Do not abuse bots or spam commands.\n' +

  '**12 Alternate Accounts**\n' +
  'Do not use alt accounts to evade punishment or gain roles.\n' +

  '**13 Unlisted Infractions**\n' +
  'Any behavior not listed but deemed disruptive by staff may result in moderation.\n' +

  '**14 Terms of Service Violations**\n' +
  'Breaking Discord ToS will result in a ban.';

// ============================================================
// IN-GAME REGULATIONS
// ============================================================

const INGAME_REGULATIONS_TEXT =
  '**Game Guidelines**\n' +
  'By joining, you agree to follow: [Roblox Terms of Service](https://en.help.roblox.com/hc/en-us/articles/115004647846-Roblox-Terms-of-Use)\n\n' +

  '**1 Respect**\n' +
  'Be kind and courteous. Disrespect or harassment will not be tolerated.\n' +

  '**2 Common Sense**\n' +
  "If it wouldn't happen in real life, don't do it (e.g. off-roading a McLaren at 130 MPH).\n" +

  '**3 Fail Roleplay (FRP)**\n' +
  'Unrealistic actions, for example; cuff-rushing, failing to roleplay PITs, etc - Also includes unrealistic UGC emotes.\n' +

  '**4 Fear Roleplay**\n' +
  'Act like your character has fear. Example: Do not run if a gun is aimed at you.\n' +

  '**5 RDM / VDM**\n' +
  'No random killing or vehicular attacks.\n' +

  '**6 New Life Rule (NLR)**\n' +
  'After death, forget previous roleplays.\n' +

  '**7 RP Permissions**\n' +
  'Major RP setups such as hostages, highway closures, and blockades must be approved by a Moderator.\n' +

  '**8 Regulation Usage**\n' +
  'Use only official server regulations. Do not use WL liveries if you are not WL.\n\n' +

  '**Moderation System:**\n' +
  '• Warnings → Minor Infractions\n' +
  '• Kicks → Moderate Infractions / 3x Warnings\n' +
  '• Bans → Severe Infractions / 2x Kicks\n\n' +

  '**9 Moderation Evidence**\n' +
  'Video proof is required to report rule-breaking. Troll reports will result in moderation.\n' +

  '**10 Jurisdiction**\n' +
  'Stay within your department jurisdiction. Department jurisdiction must be respected during roleplay.\n' +

  '**11 Exclusive Perks**\n' +
  'Boosters get access to prestige cars.\n' +

  '**12 Safezones**\n' +
  'No RP in protected areas: LEO spawns, civilian spawns, FD spawns or the gun store.\n' +

  '**13 Avatar Standards**\n' +
  'Avatars must be realistic. Troll, animal (excluding fursuits), or discriminatory styles are not allowed.\n' +

  '**14 Unlisted Infractions**\n' +
  'Disruptive behavior not listed may still result in moderation.\n' +

  '**15 Terms of Service**\n' +
  'Breaking Roblox or PRC ToS is an instant ban.\n\n' +

  '**Banned Items & Booster Vehicles**\n\n' +

  '-# Booster Vehicles\n' +
  '> -# - Surrey 650S\n' +
  '> -# - 2022 Celestial Type-5\n' +
  '> -# - 2022 Celestial Type-7\n' +
  '> -# - Takeo Experience\n' +
  '> -# - 2020 Averon LM\n' +
  '> -# - 2020 Averon LM-R\n' +
  '> -# - 2016 Chevlon Amigo LZR\n' +
  '> -# - 2014 Chevlon Corbeta RZR\n\n' +

  '-# These vehicles are banned due to their speeds and impact on law enforcement roleplay. Staff may revoke vehicle permissions if rules are being broken.\n\n' +

  '-# Banned Guns/Weapons\n' +
  '> -# - M249\n' +
  '> -# - Remington MSR\n' +
  '> -# - PPSH 41\n' +
  '> -# - Remington 700\n\n' +

  '-# Banned LEO Guns/Weapons\n' +
  '> -# - SPAS 12\n' +
  '> -# - Model 29\n' +
  '> -# - Orsis T 5000\n' +
  '> -# - Benelli M4\n' +
  '> -# - G36C\n' +
  '> -# - Type 89\n' +
  '> -# - MP5\n\n' +

  '-# Banned Roleplays\n' +
  '> -# - Homeless Shelter RPs\n' +
  '> -# - Self-Harm RPs\n' +
  '> -# - Bomb/Terrorist RPs\n' +
  '> -# - Sexual RPs\n' +
  '> -# - Hitman RPs\n' +
  '> -# - Corrupt LEO RPs';

// ============================================================
// DEPARTMENTS
// ============================================================

const DEPARTMENTS = [

  {
    name: 'Blanco County Sheriff’s Office',
    abbreviation: 'BCSO',
    description:
      'Provides law enforcement services throughout Blanco County and handles patrol, traffic enforcement, investigations, and emergency response.'
  },

  {
    name: 'Blanco County Fire & Rescue',
    abbreviation: 'BCFR',
    description:
      'Provides fire suppression, rescue services, emergency response, and medical assistance throughout the county.'
  },

  {
    name: 'Blanco County Department of Transportation',
    abbreviation: 'BCDOT',
    description:
      'Handles transportation operations, roadway services, traffic support, and infrastructure-related roleplay.'
  }

];

// ============================================================
// COMPONENTS V2 HELPERS
// ============================================================

function addMedia(container, url) {

  if (!url) {
    return container;
  }

  const gallery =
    new MediaGalleryBuilder()
      .addItems({
        media: {
          url
        }
      });

  container.addMediaGalleryComponents(gallery);

  return container;
}

function createPanel({
  title,
  content,
  topImage = '',
  bottomImage = ''
}) {

  const container =
    new ContainerBuilder()
      .setAccentColor(BRAND_COLOR);

  if (topImage) {
    addMedia(
      container,
      topImage
    );
  }

  container.addTextDisplayComponents(
    new TextDisplayBuilder()
      .setContent(
        `## ${title}\n\n${content}`
      )
  );

  if (bottomImage) {
    addMedia(
      container,
      bottomImage
    );
  }

  return container;
}

function createTextPanel({
  title,
  content,
  topImage = TOP_BANNER_URL,
  bottomImage = BOTTOM_FOOTER_URL
}) {

  return createPanel({
    title,
    content,
    topImage,
    bottomImage
  });

}

function splitText(text, maxLength = 3800) {

  const chunks = [];

  let current = '';

  for (const line of text.split('\n')) {

    if (
      (current + line + '\n').length >
      maxLength
    ) {

      if (current.trim()) {
        chunks.push(
          current.trim()
        );
      }

      current =
        `${line}\n`;

    } else {

      current +=
        `${line}\n`;

    }
  }

  if (current.trim()) {
    chunks.push(
      current.trim()
    );
  }

  return chunks;
}

// ============================================================
// TICKET HELPERS
// ============================================================

function getTicketOwner(channel) {

  if (!channel.topic) {
    return null;
  }

  const match =
    channel.topic.match(
      /OWNER:(\d+)/
    );

  return match
    ? match[1]
    : null;
}

function getTicketSubject(channel) {

  if (!channel.topic) {
    return 'Unknown';
  }

  const match =
    channel.topic.match(
      /SUBJECT:([^|]+)/
    );

  return match
    ? match[1]
    : 'Unknown';
}

function getTicketID(channel) {

  if (!channel.topic) {
    return 'Unknown';
  }

  const match =
    channel.topic.match(
      /TICKET:(\d+)/
    );

  return match
    ? match[1]
    : 'Unknown';
}

function isStaff(member) {

  if (!member?.roles) {
    return false;
  }

  const staffRoles = [

    SERVER_STAFF_ROLE_ID,
    SERVER_MANAGEMENT_ROLE_ID,
    PARTNERSHIP_TEAM_ROLE_ID

  ].filter(Boolean);

  return staffRoles.some(
    roleId =>
      member.roles.cache.has(
        roleId
      )
  );
}

// ============================================================
// TRANSCRIPT
// ============================================================

async function sendTranscript(
  channel,
  closedBy
) {

  if (!TICKET_TRANSCRIPT_CHANNEL_ID) {
    return;
  }

  const transcriptChannel =
    channel.guild.channels.cache.get(
      TICKET_TRANSCRIPT_CHANNEL_ID
    );

  if (!transcriptChannel) {
    return;
  }

  const messages =
    await channel.messages.fetch({
      limit: 100
    });

  const sorted =
    [...messages.values()]
      .sort(
        (a, b) =>
          a.createdTimestamp -
          b.createdTimestamp
      );

  let transcript =
    'BlancoCountyRP Ticket Transcript\n' +
    '========================================\n';

  transcript +=
    `Ticket: ${getTicketID(channel)}\n`;

  transcript +=
    `Subject: ${getTicketSubject(channel)}\n`;

  transcript +=
    `Owner ID: ${getTicketOwner(channel)}\n`;

  transcript +=
    `Closed By: ${closedBy.tag}\n`;

  transcript +=
    '========================================\n\n';

  for (const message of sorted) {

    transcript +=
      `[${new Date(
        message.createdTimestamp
      ).toLocaleString()}] ` +

      `${message.author.tag}: ` +

      `${message.content || '[Embed/Attachment]'}\n`;
  }

  if (transcript.length > 900000) {
    transcript =
      transcript.slice(
        0,
        899000
      );
  }

  await transcriptChannel.send({

    content:
      `Ticket transcript for **${channel.name}**`,

    files: [
      {
        attachment:
          Buffer.from(
            transcript,
            'utf8'
          ),

        name:
          `${channel.name}-transcript.txt`
      }
    ]

  });
}

// ============================================================
// FEEDBACK DM
// ============================================================

async function sendFeedbackDM(
  user,
  ticketInfo
) {

  try {

    const feedbackPanel =
      createPanel({

        title:
          'Ticket Feedback',

        content:
          'Thank you for contacting BlancoCountyRP Support.\n\n' +

          `Your **${ticketInfo.subject}** ticket has been closed.\n\n` +

          'Please rate the support you received.',

        topImage:
          TOP_BANNER_URL,

        bottomImage:
          BOTTOM_FOOTER_URL

      });

    const buttons =
      new ActionRowBuilder()
        .addComponents(

          new ButtonBuilder()
            .setCustomId(
              `feedback_1_${ticketInfo.ticketId}`
            )
            .setLabel('1')
            .setStyle(
              ButtonStyle.Danger
            ),

          new ButtonBuilder()
            .setCustomId(
              `feedback_2_${ticketInfo.ticketId}`
            )
            .setLabel('2')
            .setStyle(
              ButtonStyle.Danger
            ),

          new ButtonBuilder()
            .setCustomId(
              `feedback_3_${ticketInfo.ticketId}`
            )
            .setLabel('3')
            .setStyle(
              ButtonStyle.Secondary
            ),

          new ButtonBuilder()
            .setCustomId(
              `feedback_4_${ticketInfo.ticketId}`
            )
            .setLabel('4')
            .setStyle(
              ButtonStyle.Success
            ),

          new ButtonBuilder()
            .setCustomId(
              `feedback_5_${ticketInfo.ticketId}`
            )
            .setLabel('5')
            .setStyle(
              ButtonStyle.Success
            )

        );

    await user.send({

      flags:
        MessageFlags.IsComponentsV2,

      components: [
        feedbackPanel,
        buttons
      ]

    });

  } catch {

    console.log(
      `Unable to DM ${user.tag}.`
    );

  }
}

// ============================================================
// SLASH COMMANDS
// ============================================================

const commands = [

  new SlashCommandBuilder()
    .setName('ping')
    .setDescription(
      'Check the bot latency.'
    ),

  new SlashCommandBuilder()
    .setName('server')
    .setDescription(
      'View information about BlancoCountyRP.'
    ),

  new SlashCommandBuilder()
    .setName('rules')
    .setDescription(
      'View the Discord regulations.'
    ),

  new SlashCommandBuilder()
    .setName('ingame')
    .setDescription(
      'View the in-game regulations.'
    ),

  new SlashCommandBuilder()
    .setName('departments')
    .setDescription(
      'View the available departments.'
    ),

  new SlashCommandBuilder()
    .setName('help')
    .setDescription(
      'View the bot commands.'
    ),

  new SlashCommandBuilder()
    .setName('about')
    .setDescription(
      'Learn more about BlancoCountyRP.'
    ),

  new SlashCommandBuilder()
    .setName('ticketpanel')
    .setDescription(
      'Send the BlancoCountyRP support panel.'
    ),

  new SlashCommandBuilder()
    .setName('verifypanel')
    .setDescription(
      'Send the BlancoCountyRP verification panel.'
    )

].map(
  command =>
    command.toJSON()
);

// ============================================================
// CLIENT
// ============================================================

const client =
  new Client({

    intents: [
      GatewayIntentBits.Guilds
    ]

  });

// ============================================================
// READY
// ============================================================

client.once(
  'ready',
  () => {

    console.log(
      '=============================================='
    );

    console.log(
      `${BOT_NAME} is online!`
    );

    console.log(
      `Logged in as: ${client.user.tag}`
    );

    console.log(
      `Bot ID: ${client.user.id}`
    );

    console.log(
      '=============================================='
    );

    client.user.setPresence({

      activities: [
        {
          name:
            'Blanco County, Texas',

          type:
            ActivityType.Watching
        }
      ],

      status:
        'online'

    });

  }
);

// ============================================================
// INTERACTION HANDLER
// ============================================================

client.on(
  'interactionCreate',
  async interaction => {

    try {

      // ========================================================
      // TICKET DROPDOWN
      // ========================================================

      if (
        interaction.isStringSelectMenu() &&
        interaction.customId === 'ticket_type'
      ) {

        const selected =
          interaction.values[0];

        const subject =
          TICKET_SUBJECTS[selected];

        if (!subject) {

          return interaction.reply({

            content:
              'Invalid ticket type.',

            ephemeral:
              true

          });

        }

        await interaction.deferReply({
          ephemeral: true
        });

        const guild =
          interaction.guild;

        if (!guild) {

          return interaction.editReply({

            content:
              'Tickets can only be opened inside a server.'

          });

        }

        // ------------------------------------------------------
        // REQUIRED ROLE
        // ------------------------------------------------------

        if (
          COMMUNITY_MEMBER_ROLE_ID &&
          !interaction.member.roles.cache.has(
            COMMUNITY_MEMBER_ROLE_ID
          )
        ) {

          return interaction.editReply({

            content:
              'You do not have the required role to open a ticket.'

          });

        }

        // ------------------------------------------------------
        // EXISTING TICKET
        // ------------------------------------------------------

        const existingTicket =
          guild.channels.cache.find(
            channel => {

              if (
                channel.type !==
                ChannelType.GuildText
              ) {
                return false;
              }

              return (
                getTicketOwner(
                  channel
                ) ===
                interaction.user.id
              );

            }
          );

        if (existingTicket) {

          return interaction.editReply({

            content:
              `You already have an open ticket: ${existingTicket}`

          });

        }

        // ------------------------------------------------------
        // TICKET ID
        // ------------------------------------------------------

        const ticketId =
          Date.now()
            .toString()
            .slice(-6);

        // ------------------------------------------------------
        // USERNAME
        // ------------------------------------------------------

        const safeUsername =
          interaction.user.username
            .toLowerCase()
            .replace(
              /[^a-z0-9-]/g,
              ''
            )
            .slice(
              0,
              20
            );

        // ------------------------------------------------------
        // CHANNEL NAME
        // ------------------------------------------------------

        const channelName =
          subject.channelName
            .replace(
              '{user}',
              safeUsername
            )
            .replace(
              '{user.id}',
              interaction.user.id
            )
            .replace(
              '{subject}',
              selected
            )
            .replace(
              '{ticketid}',
              ticketId
            );

        // ------------------------------------------------------
        // PERMISSIONS
        // ------------------------------------------------------

        const permissionOverwrites = [

          {
            id:
              guild.roles.everyone.id,

            deny: [
              PermissionFlagsBits.ViewChannel
            ]
          },

          {
            id:
              interaction.user.id,

            allow: [

              PermissionFlagsBits.ViewChannel,
              PermissionFlagsBits.SendMessages,
              PermissionFlagsBits.ReadMessageHistory,
              PermissionFlagsBits.AttachFiles,
              PermissionFlagsBits.EmbedLinks

            ]
          }

        ];

        for (
          const roleId
          of subject.staffRoles
        ) {

          permissionOverwrites.push({

            id:
              roleId,

            allow: [

              PermissionFlagsBits.ViewChannel,
              PermissionFlagsBits.SendMessages,
              PermissionFlagsBits.ReadMessageHistory,
              PermissionFlagsBits.AttachFiles,
              PermissionFlagsBits.EmbedLinks,
              PermissionFlagsBits.ManageMessages

            ]

          });

        }

        // ------------------------------------------------------
        // CREATE CHANNEL
        // ------------------------------------------------------

        const ticketChannel =
          await guild.channels.create({

            name:
              channelName,

            type:
              ChannelType.GuildText,

            parent:
              TICKET_CATEGORY_ID ||
              undefined,

            topic:
              `OWNER:${interaction.user.id}` +
              `|SUBJECT:${subject.label}` +
              `|TICKET:${ticketId}`,

            permissionOverwrites

          });

        // ------------------------------------------------------
        // TICKET PANEL
        // ------------------------------------------------------

        const ticketPanel =
          createPanel({

            title:
              subject.label,

            content:
              subject.message,

            topImage:
              TICKET_BANNER_URL ||
              TOP_BANNER_URL,

            bottomImage:
              TICKET_BOTTOM_IMAGE_URL ||
              BOTTOM_FOOTER_URL

          });

        const ticketButtons =
          new ActionRowBuilder()
            .addComponents(

              new ButtonBuilder()
                .setCustomId(
                  'claim_ticket'
                )
                .setLabel(
                  'Claim Ticket'
                )
                .setStyle(
                  ButtonStyle.Primary
                ),

              new ButtonBuilder()
                .setCustomId(
                  'close_ticket'
                )
                .setLabel(
                  'Close Ticket'
                )
                .setStyle(
                  ButtonStyle.Danger
                )

            );

        await ticketChannel.send({

          content:
            `${interaction.user}`,

          flags:
            MessageFlags.IsComponentsV2,

          components: [

            ticketPanel,
            ticketButtons

          ]

        });

        await interaction.editReply({

          content:
            `Your ticket has been created: ${ticketChannel}`

        });

        return;
      }

      // ========================================================
      // CLAIM TICKET
      // ========================================================

      if (
        interaction.isButton() &&
        interaction.customId === 'claim_ticket'
      ) {

        if (!interaction.channel) {
          return;
        }

        if (
          !isStaff(
            interaction.member
          )
        ) {

          return interaction.reply({

            content:
              'You do not have permission to claim tickets.',

            ephemeral:
              true

          });

        }

        const ticketOwner =
          getTicketOwner(
            interaction.channel
          );

        const subject =
          getTicketSubject(
            interaction.channel
          );

        const ticketId =
          getTicketID(
            interaction.channel
          );

        const claimedPanel =
          createPanel({

            title:
              subject,

            content:
              `This ticket has been claimed by ${interaction.user}.\n\n` +

              `**Ticket ID:** ${ticketId}\n` +
              `**Opened By:** <@${ticketOwner}>\n` +
              `**Claimed By:** ${interaction.user}`,

            topImage:
              TICKET_BANNER_URL ||
              TOP_BANNER_URL,

            bottomImage:
              TICKET_BOTTOM_IMAGE_URL ||
              BOTTOM_FOOTER_URL

          });

        const closeButton =
          new ActionRowBuilder()
            .addComponents(

              new ButtonBuilder()
                .setCustomId(
                  'close_ticket'
                )
                .setLabel(
                  'Close Ticket'
                )
                .setStyle(
                  ButtonStyle.Danger
                )

            );

        await interaction.update({

          flags:
            MessageFlags.IsComponentsV2,

          components: [

            claimedPanel,
            closeButton

          ]

        });

        return;
      }

      // ========================================================
      // CLOSE TICKET
      // ========================================================

      if (
        interaction.isButton() &&
        interaction.customId === 'close_ticket'
      ) {

        if (!interaction.channel) {
          return;
        }

        const ownerId =
          getTicketOwner(
            interaction.channel
          );

        if (
          interaction.user.id !== ownerId &&
          !isStaff(
            interaction.member
          )
        ) {

          return interaction.reply({

            content:
              'You do not have permission to close this ticket.',

            ephemeral:
              true

          });

        }

        const confirmationRow =
          new ActionRowBuilder()
            .addComponents(

              new ButtonBuilder()
                .setCustomId(
                  'confirm_close_ticket'
                )
                .setLabel(
                  'Confirm Close'
                )
                .setStyle(
                  ButtonStyle.Danger
                ),

              new ButtonBuilder()
                .setCustomId(
                  'cancel_close_ticket'
                )
                .setLabel(
                  'Cancel'
                )
                .setStyle(
                  ButtonStyle.Secondary
                )

            );

        const confirmationPanel =
          createPanel({

            title:
              'Close Ticket',

            content:
              'Are you sure you want to close this ticket?\n\n' +
              'The ticket transcript will be saved and the ticket owner will receive a feedback message.',

            topImage:
              TICKET_BANNER_URL ||
              TOP_BANNER_URL,

            bottomImage:
              TICKET_BOTTOM_IMAGE_URL ||
              BOTTOM_FOOTER_URL

          });

        await interaction.reply({

          flags:
            MessageFlags.IsComponentsV2,

          components: [

            confirmationPanel,
            confirmationRow

          ]

        });

        return;
      }

      // ========================================================
      // CANCEL CLOSE
      // ========================================================

      if (
        interaction.isButton() &&
        interaction.customId ===
          'cancel_close_ticket'
      ) {

        await interaction.update({

          content:
            'Ticket closure cancelled.',

          components: []

        });

        return;
      }

      // ========================================================
      // CONFIRM CLOSE
      // ========================================================

      if (
        interaction.isButton() &&
        interaction.customId ===
          'confirm_close_ticket'
      ) {

        const channel =
          interaction.channel;

        if (!channel) {
          return;
        }

        const ownerId =
          getTicketOwner(
            channel
          );

        const subject =
          getTicketSubject(
            channel
          );

        const ticketId =
          getTicketID(
            channel
          );

        const owner =
          await client.users.fetch(
            ownerId
          ).catch(
            () => null
          );

        await sendTranscript(
          channel,
          interaction.user
        );

        if (owner) {

          await sendFeedbackDM(
            owner,
            {
              ticketId,
              subject
            }
          );

        }

        await interaction.update({

          content:
            'Ticket closed. This channel will be deleted shortly.',

          components: []

        });

        setTimeout(
          async () => {

            try {

              await channel.delete();

            } catch (error) {

              console.error(
                'Failed to delete ticket:',
                error
              );

            }

          },
          5000
        );

        return;
      }

      // ========================================================
      // FEEDBACK
      // ========================================================

      if (
        interaction.isButton() &&
        interaction.customId.startsWith(
          'feedback_'
        )
      ) {

        const parts =
          interaction.customId.split(
            '_'
          );

        const rating =
          Number(parts[1]);

        const ticketId =
          parts[2];

        if (
          TICKET_FEEDBACK_CHANNEL_ID
        ) {

          const feedbackChannel =
            client.channels.cache.get(
              TICKET_FEEDBACK_CHANNEL_ID
            );

          if (feedbackChannel) {

            const feedbackPanel =
              createPanel({

                title:
                  'Ticket Feedback',

                content:
                  `**User:** ${interaction.user}\n` +
                  `**Rating:** ${rating}/5\n` +
                  `**Ticket ID:** ${ticketId}`,

                topImage:
                  TOP_BANNER_URL,

                bottomImage:
                  BOTTOM_FOOTER_URL

              });

            await feedbackChannel.send({

              flags:
                MessageFlags.IsComponentsV2,

              components: [
                feedbackPanel
              ]

            });

          }

        }

        await interaction.update({

          content:
            'Thank you for your feedback. Your rating has been recorded.',

          components: []

        });

        return;
      }

      // ========================================================
      // VERIFY
      // ========================================================

      if (
        interaction.isButton() &&
        interaction.customId ===
          'verify_member'
      ) {

        if (!VERIFIED_ROLE_ID) {

          return interaction.reply({

            content:
              'The verification role has not been configured yet.',

            ephemeral:
              true

          });

        }

        if (
          interaction.member.roles.cache.has(
            VERIFIED_ROLE_ID
          )
        ) {

          return interaction.reply({

            content:
              'You are already verified.',

            ephemeral:
              true

          });

        }

        await interaction.member.roles.add(
          VERIFIED_ROLE_ID
        );

        await interaction.reply({

          content:
            'You have been verified successfully.',

          ephemeral:
            true

        });

        return;
      }

      // ========================================================
      // /TICKETPANEL
      // ========================================================

      if (
        interaction.isChatInputCommand() &&
        interaction.commandName ===
          'ticketpanel'
      ) {

        const ticketPanel =
          createPanel({

            title:
              'BlancoCountyRP Support Team',

            content:

              '# BlancoCountyRP : Support Hub\n\n' +

              'This is the place where you can receive support for the following:\n\n' +

              '**General Support**\n' +
              '> General Questions\n' +
              '> Reporting somebody in-game\n\n' +

              '**Management Support**\n' +
              '> Reporting Partners, staff, etc.\n' +
              '> Claiming Giveaway rewards\n' +
              '> Staff Fastpass\n' +
              '> Requesting Partners\n' +
              '> Partnership Questions',

            topImage:
              TICKET_BANNER_URL ||
              TOP_BANNER_URL,

            bottomImage:
              TICKET_BOTTOM_IMAGE_URL ||
              BOTTOM_FOOTER_URL

          });

        const ticketMenu =
          new StringSelectMenuBuilder()

            .setCustomId(
              'ticket_type'
            )

            .setPlaceholder(
              'Select ticket type...'
            )

            .addOptions(

              {
                label:
                  'General Support',

                description:
                  'Support which cannot be answered within general.',

                value:
                  'general_support'
              },

              {
                label:
                  'Management Support',

                description:
                  'For support which needs to be handled by management.',

                value:
                  'management_support'
              }

            );

        const menuRow =
          new ActionRowBuilder()
            .addComponents(
              ticketMenu
            );

        await interaction.reply({

          flags:
            MessageFlags.IsComponentsV2,

          components: [

            ticketPanel,
            menuRow

          ]

        });

        return;
      }

      // ========================================================
      // /VERIFYPANEL
      // ========================================================

      if (
        interaction.isChatInputCommand() &&
        interaction.commandName ===
          'verifypanel'
      ) {

        const verificationPanel =
          createPanel({

            title:
              'Verification',

            content:

              'Welcome to **Blanco County Roleplay**!\n\n' +

              'To gain access to the **rest of the server**, please complete verification.\n\n' +

              '**How to verify:**\n' +
              'Click the Verify button below.\n' +
              'Make sure you have read the rules.\n' +
              'Once verified, you will unlock all channels.\n\n' +

              '**Why we verify:**\n' +
              'Prevent bots\n' +
              'Keep the community safe\n' +
              'Ensure everyone follows the rules.\n\n' +

              `If you have issues verifying, please contact a staff member in <#${VERIFICATION_SUPPORT_CHANNEL_ID}>.\n\n` +

              '-# Thank you for joining and enjoy your stay.',

            topImage:
              VERIFICATION_BANNER_URL ||
              TOP_BANNER_URL,

            bottomImage:
              VERIFICATION_BOTTOM_IMAGE_URL ||
              BOTTOM_FOOTER_URL

          });

        const verifyButton =
          new ButtonBuilder()
            .setCustomId(
              'verify_member'
            )
            .setLabel(
              'Verify'
            )
            .setStyle(
              ButtonStyle.Primary
            );

        const verifyRow =
          new ActionRowBuilder()
            .addComponents(
              verifyButton
            );

        await interaction.reply({

          flags:
            MessageFlags.IsComponentsV2,

          components: [

            verificationPanel,
            verifyRow

          ]

        });

        return;
      }

      // ========================================================
      // /PING
      // ========================================================

      if (
        interaction.isChatInputCommand() &&
        interaction.commandName ===
          'ping'
      ) {

        const panel =
          createTextPanel({

            title:
              'Pong',

            content:
              `**Bot Latency:** ${Date.now() - interaction.createdTimestamp}ms\n` +
              `**API Latency:** ${client.ws.ping}ms\n\n` +
              MOTTO

          });

        await interaction.reply({

          flags:
            MessageFlags.IsComponentsV2,

          components: [
            panel
          ]

        });

        return;
      }

      // ========================================================
      // /SERVER
      // ========================================================

      if (
        interaction.isChatInputCommand() &&
        interaction.commandName ===
          'server'
      ) {

        const panel =
          createTextPanel({

            title:
              SERVER_NAME,

            content:

              '**Blanco County, Texas**\n\n' +

              'BlancoCountyRP is a whitelisted roleplay community focused on realism, professionalism, and quality roleplay.\n\n' +

              `**Status:** ${STATUS}\n\n` +

              `**Motto:** ${MOTTO}\n\n` +

              `[Join the Community](${DISCORD_INVITE})`

          });

        await interaction.reply({

          flags:
            MessageFlags.IsComponentsV2,

          components: [
            panel
          ]

        });

        return;
      }

      // ========================================================
      // /RULES
      // ========================================================

      if (
        interaction.isChatInputCommand() &&
        interaction.commandName ===
          'rules'
      ) {

        const chunks =
          splitText(
            DISCORD_REGULATIONS_TEXT
          );

        const panels =
          chunks.map(
            (chunk, index) =>

              createTextPanel({

                title:
                  chunks.length > 1
                    ? `Discord Regulations • ${index + 1}/${chunks.length}`
                    : 'Discord Regulations',

                content:
                  chunk

              })

          );

        await interaction.reply({

          flags:
            MessageFlags.IsComponentsV2,

          components:
            panels

        });

        return;
      }

      // ========================================================
      // /INGAME
      // ========================================================

      if (
        interaction.isChatInputCommand() &&
        interaction.commandName ===
          'ingame'
      ) {

        const chunks =
          splitText(
            INGAME_REGULATIONS_TEXT
          );

        const panels =
          chunks.map(
            (chunk, index) =>

              createTextPanel({

                title:
                  chunks.length > 1
                    ? `In-Game Regulations • ${index + 1}/${chunks.length}`
                    : 'In-Game Regulations',

                content:
                  chunk

              })

          );

        await interaction.reply({

          flags:
            MessageFlags.IsComponentsV2,

          components:
            panels

        });

        return;
      }

      // ========================================================
      // /DEPARTMENTS
      // ========================================================

      if (
        interaction.isChatInputCommand() &&
        interaction.commandName ===
          'departments'
      ) {

        const departmentText =
          DEPARTMENTS
            .map(
              department =>

                `### ${department.name}\n` +
                `**${department.abbreviation}**\n` +
                department.description

            )
            .join('\n\n');

        const panel =
          createTextPanel({

            title:
              'BlancoCountyRP Departments',

            content:
              'Your journey at BlancoCountyRP starts here. Explore our departments and become part of the community.\n\n' +
              departmentText

          });

        await interaction.reply({

          flags:
            MessageFlags.IsComponentsV2,

          components: [
            panel
          ]

        });

        return;
      }

      // ========================================================
      // /HELP
      // ========================================================

      if (
        interaction.isChatInputCommand() &&
        interaction.commandName ===
          'help'
      ) {

        const panel =
          createTextPanel({

            title:
              'BlancoCountyRP Bot Help',

            content:

              '**/ping**\n' +
              'Check the bot latency.\n\n' +

              '**/server**\n' +
              'View BlancoCountyRP server information.\n\n' +

              '**/rules**\n' +
              'View the Discord regulations.\n\n' +

              '**/ingame**\n' +
              'View the in-game regulations.\n\n' +

              '**/departments**\n' +
              'View available departments.\n\n' +

              '**/ticketpanel**\n' +
              'Send the support ticket panel.\n\n' +

              '**/verifypanel**\n' +
              'Send the verification panel.\n\n' +

              '**/about**\n' +
              'Learn more about BlancoCountyRP.'

          });

        await interaction.reply({

          flags:
            MessageFlags.IsComponentsV2,

          components: [
            panel
          ]

        });

        return;
      }

      // ========================================================
      // /ABOUT
      // ========================================================

      if (
        interaction.isChatInputCommand() &&
        interaction.commandName ===
          'about'
      ) {

        const panel =
          createTextPanel({

            title:
              'About BlancoCountyRP',

            content:

              `${ABOUT_TEXT}\n\n` +

              '**BlancoCountyRP**\n' +
              'Focused On Realism, Professionalism, And More!\n\n' +

              `**Motto:** ${MOTTO}\n\n` +

              `**Status:** ${STATUS}\n\n` +

              `[Join BlancoCountyRP](${DISCORD_INVITE})`

          });

        await interaction.reply({

          flags:
            MessageFlags.IsComponentsV2,

          components: [
            panel
          ]

        });

        return;
      }

    } catch (error) {

      console.error(
        'Interaction error:',
        error
      );

      if (
        interaction.replied ||
        interaction.deferred
      ) {

        try {

          await interaction.followUp({

            content:
              'Something went wrong while processing that request.',

            ephemeral:
              true

          });

        } catch {}

      } else {

        try {

          await interaction.reply({

            content:
              'Something went wrong while processing that request.',

            ephemeral:
              true

          });

        } catch {}

      }

    }

  }
);

// ============================================================
// REGISTER SLASH COMMANDS
// ============================================================

async function registerCommands() {

  if (!process.env.BOT_TOKEN) {

    throw new Error(
      'BOT_TOKEN is missing from your .env file.'
    );

  }

  if (!process.env.CLIENT_ID) {

    throw new Error(
      'CLIENT_ID is missing from your .env file.'
    );

  }

  const rest =
    new REST({
      version: '10'
    }).setToken(
      process.env.BOT_TOKEN
    );

  console.log(
    'Registering slash commands...'
  );

  await rest.put(

    Routes.applicationCommands(
      process.env.CLIENT_ID
    ),

    {
      body:
        commands
    }

  );

  console.log(
    'Slash commands registered successfully.'
  );
}

// ============================================================
// START BOT
// ============================================================

async function startBot() {

  try {

    await registerCommands();

    console.log(
      'Starting Discord client...'
    );

    await client.login(
      process.env.BOT_TOKEN
    );

  } catch (error) {

    console.error(
      'Failed to start bot:'
    );

    console.error(
      error
    );

    process.exit(1);
  }
}

startBot();
