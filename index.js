// ============================================================
// Blanco County RP Operations
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

const BOT_NAME = 'Blanco County RP Operations';
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
// GITHUB ASSETS
// IMPORTANT: These are RAW GitHub URLs, not /blob/ URLs.
// ============================================================

const TOP_BANNER_URL =
  'https://raw.githubusercontent.com/TEXASGUYLSRPBOTS/BCRP-Bot-Example/main/assets/discord-banner%20(1).png';

const BOTTOM_FOOTER_URL =
  'https://raw.githubusercontent.com/TEXASGUYLSRPBOTS/BCRP-Bot-Example/main/assets/discord-banner%20(2).png';

// ============================================================
// VERIFICATION
// ============================================================

const VERIFIED_ROLE_ID =
  '1553091032781037608';

const VERIFICATION_SUPPORT_CHANNEL_ID =
  '1553090868691599402';

const VERIFICATION_BANNER_URL =
  TOP_BANNER_URL;

const VERIFICATION_BOTTOM_IMAGE_URL =
  BOTTOM_FOOTER_URL;

// ============================================================
// TICKETS
// ============================================================

const TICKET_CATEGORY_ID =
  '1553091562454519929';

const SERVER_STAFF_ROLE_ID =
  '1553091374428065903';

const SERVER_MANAGEMENT_ROLE_ID =
  '1553091286926364672';

const PARTNERSHIP_TEAM_ROLE_ID =
  '1553091195264172177';

const COMMUNITY_MEMBER_ROLE_ID =
  '1553091095749988402';

const TICKET_TRANSCRIPT_CHANNEL_ID =
  '1553091667924357220';

const TICKET_FEEDBACK_CHANNEL_ID =
  '1553091755836964994';

const TICKET_BANNER_URL =
  TOP_BANNER_URL;

const TICKET_BOTTOM_IMAGE_URL =
  BOTTOM_FOOTER_URL;

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

      'Do not ping support staff. Remain respectful at all times.\n\n' +

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

      'Do not ping management staff. Remain respectful at all times.\n\n' +

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
  'By joining, you agree to follow the [Discord Terms of Service](https://discord.com/terms) and [Discord Community Guidelines](https://discord.com/guidelines).\n\n' +

  '**1. Respect**\n' +
  'Treat all members respectfully. No harassment, hate speech, or discrimination.\n\n' +

  '**2. Common Sense**\n' +
  'Use good judgment. Do not spam, troll, or intentionally provoke arguments.\n\n' +

  '**3. Inappropriate Content**\n' +
  'No adult, graphic, or offensive content. This applies to messages, avatars, and nicknames.\n\n' +

  '**4. Voice Chat Rules**\n' +
  'No mic spam, soundboards, or disruptive behavior.\n\n' +

  '**5. Impersonation**\n' +
  'Do not impersonate staff, bots, or other members.\n\n' +

  '**6. Advertising**\n' +
  'No advertising external servers, products, or services without permission.\n\n' +

  '**7. Malicious Content**\n' +
  'No viruses, malicious scripts, or suspicious links.\n\n' +

  '**8. Staff Instructions**\n' +
  'Follow directions given by staff. Public arguments regarding staff decisions are not permitted.\n\n' +

  '**Moderation System**\n' +
  '• Warnings → Minor Infractions\n' +
  '• Mutes → Continued disruption or failure to follow instructions\n' +
  '• Kicks → Moderate or repeated violations\n' +
  '• Bans → Severe violations\n\n' +

  '**9. Name Rules**\n' +
  'Usernames must follow community requirements.\n\n' +

  '**10. Channel Usage**\n' +
  'Use channels for their intended purpose. Do not derail conversations or flood chats.\n\n' +

  '**11. Bot Usage**\n' +
  'Do not abuse bots or spam commands.\n\n' +

  '**12. Alternate Accounts**\n' +
  'Do not use alternate accounts to evade punishment or gain unauthorized roles.\n\n' +

  '**13. Unlisted Infractions**\n' +
  'Behavior not specifically listed may still result in moderation when it disrupts the community.\n\n' +

  '**14. Terms of Service Violations**\n' +
  'Discord Terms of Service violations may result in removal from the community.';

// ============================================================
// IN-GAME REGULATIONS
// ============================================================

const INGAME_REGULATIONS_TEXT =
  '**Game Guidelines**\n' +
  'By joining, you agree to follow the [Roblox Terms of Use](https://en.help.roblox.com/hc/en-us/articles/115004647846-Roblox-Terms-of-Use).\n\n' +

  '**1. Respect**\n' +
  'Be kind and courteous. Disrespect and harassment are not permitted.\n\n' +

  '**2. Common Sense**\n' +
  'Roleplay should remain believable and appropriate for the situation.\n\n' +

  '**3. Fail Roleplay (FRP)**\n' +
  'Unrealistic actions that negatively affect roleplay are prohibited.\n\n' +

  '**4. Fear Roleplay**\n' +
  'Players should appropriately roleplay fear and danger during situations.\n\n' +

  '**5. RDM / VDM**\n' +
  'Random killing and intentionally using vehicles to attack players are prohibited.\n\n' +

  '**6. New Life Rule (NLR)**\n' +
  'After death, players should not use information from their previous roleplay situation.\n\n' +

  '**7. RP Permissions**\n' +
  'Major roleplay setups such as hostages, highway closures, and blockades must be approved by authorized staff.\n\n' +

  '**8. Regulation Usage**\n' +
  'Use only official server regulations. Department restrictions must be respected.\n\n' +

  '**Moderation System**\n' +
  '• Warnings → Minor Infractions\n' +
  '• Kicks → Moderate Infractions / repeated warnings\n' +
  '• Bans → Severe or repeated infractions\n\n' +

  '**9. Moderation Evidence**\n' +
  'Video proof is required when reporting rule-breaking whenever reasonably possible. False or intentionally misleading reports may result in moderation.\n\n' +

  '**10. Jurisdiction**\n' +
  'Stay within your department jurisdiction. Department jurisdiction must be respected during roleplay.\n\n' +

  '**11. Exclusive Perks**\n' +
  'Community perks are subject to the current server rules and staff decisions.\n\n' +

  '**12. Safezones**\n' +
  'No roleplay in protected areas such as designated department spawns and other areas identified by staff.\n\n' +

  '**13. Avatar Standards**\n' +
  'Avatars must remain appropriate and reasonably realistic for the roleplay environment.\n\n' +

  '**14. Unlisted Infractions**\n' +
  'Disruptive behavior not listed may still result in moderation.\n\n' +

  '**15. Terms of Service**\n' +
  'Breaking Roblox or applicable platform Terms of Service may result in removal from the community.\n\n' +

  '**Restricted Items & Roleplays**\n' +
  'Refer to the current official BlancoCountyRP restricted-item list and staff announcements for the current restrictions.\n\n' +

  '**Restricted Roleplays**\n' +
  'Roleplays involving sexual content, graphic content, terrorism/bomb scenarios, or other prohibited content are not allowed.';

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

  container.addMediaGalleryComponents(
    gallery
  );

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

function splitText(
  text,
  maxLength = 3500
) {

  const chunks = [];
  let current = '';

  for (const line of text.split('\n')) {

    const next =
      `${current}${line}\n`;

    if (
      next.length > maxLength &&
      current.trim()
    ) {

      chunks.push(
        current.trim()
      );

      current =
        `${line}\n`;

    } else {

      current =
        next;

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
// V2 STATUS PANEL
// Used when a V2 message needs to be updated.
// ============================================================

function createStatusPanel(
  title,
  content
) {

  return createPanel({
    title,
    content,
    topImage: TICKET_BANNER_URL,
    bottomImage: TICKET_BOTTOM_IMAGE_URL
  });

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

  if (!member?.roles?.cache) {
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
    console.log(
      'Transcript channel not found.'
    );
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

    const content =
      message.content ||
      '[Embed/Attachment/Component Message]';

    transcript +=
      `[${new Date(
        message.createdTimestamp
      ).toLocaleString()}] ` +
      `${message.author.tag}: ` +
      `${content}\n`;

    if (
      message.attachments.size > 0
    ) {

      transcript +=
        `Attachments: ${[
          ...message.attachments.values()
        ]
          .map(
            attachment =>
              attachment.url
          )
          .join(', ')}\n`;

    }

    transcript += '\n';
  }

  if (
    transcript.length > 900000
  ) {

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
      '=================================================='
    );

    console.log(
      ` ${BOT_NAME}`
    );

    console.log(
      '=================================================='
    );

    console.log(
      `Logged in as: ${client.user.tag}`
    );

    console.log(
      `Bot ID: ${client.user.id}`
    );

    console.log(
      `Status: ${STATUS}`
    );

    console.log(
      `Commands Loaded: ${commands.length}`
    );

    console.log(
      '=================================================='
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
        // REQUIRED COMMUNITY ROLE
        // ------------------------------------------------------

        if (
          COMMUNITY_MEMBER_ROLE_ID &&
          !interaction.member.roles.cache.has(
            COMMUNITY_MEMBER_ROLE_ID
          )
        ) {

          return interaction.editReply({

            content:
              'You do not have the required community member role to open a ticket.'

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
        // SAFE USERNAME
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
            ) ||
          'member';

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
        // CREATE TICKET CHANNEL
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
        //
        // IMPORTANT:
        // Components V2 cannot use top-level "content".
        // ------------------------------------------------------

        const ticketPanel =
          createPanel({

            title:
              subject.label,

            content:
              `Ticket opened by ${interaction.user}.\n\n` +
              subject.message,

            topImage:
              TICKET_BANNER_URL,

            bottomImage:
              TICKET_BOTTOM_IMAGE_URL

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
              `**Claimed By:** ${interaction.user}\n\n` +

              'A member of the support team is now handling this ticket.',

            topImage:
              TICKET_BANNER_URL,

            bottomImage:
              TICKET_BOTTOM_IMAGE_URL

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
              TICKET_BANNER_URL,

            bottomImage:
              TICKET_BOTTOM_IMAGE_URL

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

        const cancelledPanel =
          createStatusPanel(
            'Close Ticket',
            'Ticket closure has been cancelled.\n\n' +
            'The ticket remains open.'
          );

        await interaction.update({

          flags:
            MessageFlags.IsComponentsV2,

          components: [
            cancelledPanel
          ]

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
          ownerId
            ? await client.users.fetch(
                ownerId
              ).catch(
                () => null
              )
            : null;

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

        const closedPanel =
          createStatusPanel(

            'Ticket Closed',

            'This ticket has been closed.\n\n' +
            'The transcript has been saved and the ticket owner has been sent a feedback request.\n\n' +
            'This channel will be deleted shortly.'

          );

        await interaction.update({

          flags:
            MessageFlags.IsComponentsV2,

          components: [
            closedPanel
          ]

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
          Number(
            parts[1]
          );

        const ticketId =
          parts[2];

        if (
          TICKET_FEEDBACK_CHANNEL_ID
        ) {

          const feedbackChannel =
            client.channels.cache.get(
              TICKET_FEEDBACK_CHANNEL_ID
            );

          if (
            feedbackChannel &&
            feedbackChannel.isTextBased()
          ) {

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

        const thankYouPanel =
          createStatusPanel(

            'Feedback Received',

            'Thank you for your feedback.\n\n' +
            `Your rating of **${rating}/5** has been recorded.`

          );

        await interaction.update({

          flags:
            MessageFlags.IsComponentsV2,

          components: [
            thankYouPanel
          ]

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
              TICKET_BANNER_URL,

            bottomImage:
              TICKET_BOTTOM_IMAGE_URL

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
              '• Prevent bots\n' +
              '• Keep the community organized\n' +
              '• Ensure members follow the rules\n\n' +

              `If you have issues verifying, please contact a staff member in <#${VERIFICATION_SUPPORT_CHANNEL_ID}>.\n\n` +

              '-# Thank you for joining and enjoy your stay.',

            topImage:
              VERIFICATION_BANNER_URL,

            bottomImage:
              VERIFICATION_BOTTOM_IMAGE_URL

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
            .join(
              '\n\n'
            );

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

      // --------------------------------------------------------
      // Safe error response
      // --------------------------------------------------------

      try {

        if (
          interaction.replied ||
          interaction.deferred
        ) {

          await interaction.followUp({

            content:
              'Something went wrong while processing that request.',

            ephemeral:
              true

          });

        } else {

          await interaction.reply({

            content:
              'Something went wrong while processing that request.',

            ephemeral:
              true

          });

        }

      } catch {

        console.error(
          'Unable to send interaction error response.'
        );

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
      'BOT_TOKEN is missing from your environment variables.'
    );

  }

  if (!process.env.CLIENT_ID) {

    throw new Error(
      'CLIENT_ID is missing from your environment variables.'
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
    `Successfully registered ${commands.length} slash commands.`
  );

}

// ============================================================
// START BOT
// ============================================================

async function startBot() {

  try {

    console.log(
      '=================================================='
    );

    console.log(
      'Blanco County RP Operations'
    );

    console.log(
      'Starting bot...'
    );

    console.log(
      '=================================================='
    );

    await registerCommands();

    console.log(
      'Connecting to Discord...'
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
