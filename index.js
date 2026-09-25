// ============================================================
// Blanco County RP Operations
// Discord Bot
// Built by a Vision. Driven by Roleplay.
// ============================================================

import 'dotenv/config';
import http from 'node:http';

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
  ChannelSelectMenuBuilder,
  ChannelType,
  PermissionFlagsBits,
  MessageFlags,
  ContainerBuilder,
  TextDisplayBuilder,
  MediaGalleryBuilder,
  EmbedBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle
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

const COMMUNITY_MEMBER_ROLE_ID =
  '1553091095749988402';

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

const TICKET_TRANSCRIPT_CHANNEL_ID =
  '1553091667924357220';

const TICKET_FEEDBACK_CHANNEL_ID =
  '1553091755836964994';

const TICKET_BANNER_URL =
  TOP_BANNER_URL;

const TICKET_BOTTOM_IMAGE_URL =
  BOTTOM_FOOTER_URL;

// ============================================================
// ENVIRONMENT
// ============================================================

const BOT_TOKEN =
  (process.env.BOT_TOKEN || '').trim();

const CLIENT_ID =
  (process.env.CLIENT_ID || '').trim();

// ============================================================
// RENDER HEALTH SERVER
// ============================================================

const RENDER_PORT =
  Number(process.env.PORT) || 10000;

const healthServer =
  http.createServer((req, res) => {

    res.writeHead(200, {
      'Content-Type':
        'text/plain; charset=utf-8'
    });

    res.end(
      `${BOT_NAME} is online.\n`
    );

  });

healthServer.listen(
  RENDER_PORT,
  '0.0.0.0',
  () => {

    console.log(
      '=================================================='
    );

    console.log(
      `Render health server listening on port ${RENDER_PORT}`
    );

    console.log(
      '=================================================='
    );

  }
);

healthServer.on(
  'error',
  error => {

    console.error(
      'Render health server error:',
      error
    );

  }
);

// ============================================================
// ENVIRONMENT VALIDATION
// ============================================================

function validateEnvironment() {

  console.log(
    'Environment check...'
  );

  if (!BOT_TOKEN) {

    console.error(
      '❌ BOT_TOKEN is missing.'
    );

    console.error(
      'Add BOT_TOKEN to Render → Environment.'
    );

    return false;

  }

  if (!CLIENT_ID) {

    console.error(
      '❌ CLIENT_ID is missing.'
    );

    console.error(
      'Add CLIENT_ID to Render → Environment.'
    );

    return false;

  }

  console.log(
    '✓ BOT_TOKEN is present.'
  );

  console.log(
    `✓ CLIENT_ID: ${CLIENT_ID}`
  );

  return true;

}

// ============================================================
// TICKET SUBJECTS
// ============================================================

const TICKET_SUBJECTS = {

  general_support: {

    label:
      'General Support',

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

    label:
      'Management Support',

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
  'Refer to the current official BlancoCountyRP restricted-item list and staff announcements for current restrictions.\n\n' +

  '**Restricted Roleplays**\n' +
  'Roleplays involving sexual content, graphic content, or other prohibited content are not allowed.';

// ============================================================
// DEPARTMENTS
// ============================================================

const DEPARTMENTS = [

  {
    name:
      'Blanco County Sheriff’s Office',

    abbreviation:
      'BCSO',

    description:
      'Provides law enforcement services throughout Blanco County and handles patrol, traffic enforcement, investigations, and emergency response.'
  },

  {
    name:
      'Blanco County Fire & Rescue',

    abbreviation:
      'BCFR',

    description:
      'Provides fire suppression, rescue services, emergency response, and medical assistance throughout the county.'
  },

  {
    name:
      'Blanco County Department of Transportation',

    abbreviation:
      'BCDOT',

    description:
      'Handles transportation operations, roadway services, traffic support, and infrastructure-related roleplay.'
  }

];

// ============================================================
// COMPONENTS V2
// ============================================================

function addMedia(container, url) {

  if (!url) return container;

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
    addMedia(container, topImage);
  }

  container.addTextDisplayComponents(
    new TextDisplayBuilder()
      .setContent(
        `## ${title}\n\n${content}`
      )
  );

  if (bottomImage) {
    addMedia(container, bottomImage);
  }

  return container;
}

function createTextPanel({
  title,
  content
}) {

  return createPanel({
    title,
    content,
    topImage: TOP_BANNER_URL,
    bottomImage: BOTTOM_FOOTER_URL
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

  if (!channel.topic) return null;

  const match =
    channel.topic.match(
      /OWNER:(\d+)/
    );

  return match
    ? match[1]
    : null;
}

function getTicketSubject(channel) {

  if (!channel.topic) return 'Unknown';

  const match =
    channel.topic.match(
      /SUBJECT:([^|]+)/
    );

  return match
    ? match[1]
    : 'Unknown';
}

function getTicketID(channel) {

  if (!channel.topic) return 'Unknown';

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
      member.roles.cache.has(roleId)
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

  if (
    !transcriptChannel ||
    !transcriptChannel.isTextBased()
  ) {

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

    if (message.attachments.size > 0) {

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
// ADVANCED EMBED STUDIO
// ============================================================

const embedDrafts = new Map();
const embedTemplates = new Map();

function blankEmbedDraft() {

  return {

    content: '',

    embeds: [
      {
        title: '',
        description: '',
        color: 'FFFFFF',
        url: '',
        timestamp: false,

        author: {
          name: '',
          url: '',
          iconURL: ''
        },

        footer: {
          text: '',
          iconURL: ''
        },

        thumbnail: '',
        image: '',

        fields: []
      }
    ],

    allowedMentions: {
      users: false,
      roles: false,
      everyone: false
    }

  };
}

function cloneData(data) {
  return JSON.parse(
    JSON.stringify(data)
  );
}

function getEmbedDraft(userId) {

  if (!embedDrafts.has(userId)) {
    embedDrafts.set(
      userId,
      blankEmbedDraft()
    );
  }

  return embedDrafts.get(userId);
}

function currentEmbed(userId) {

  const draft =
    getEmbedDraft(userId);

  if (!draft.embeds.length) {

    draft.embeds.push(
      blankEmbedDraft().embeds[0]
    );

  }

  return draft.embeds[0];
}

function normalizeColor(value) {

  if (!value) {
    return null;
  }

  let color =
    String(value)
      .trim()
      .replace(/^#/, '');

  if (
    !/^[0-9a-fA-F]{6}$/.test(color)
  ) {
    return null;
  }

  return parseInt(
    color,
    16
  );
}

function validHttpUrl(value) {

  if (!value) return true;

  try {

    const url =
      new URL(value);

    return (
      url.protocol === 'http:' ||
      url.protocol === 'https:'
    );

  } catch {

    return false;

  }
}

function embedCharacterCount(embed) {

  let count = 0;

  count +=
    embed.title?.length || 0;

  count +=
    embed.description?.length || 0;

  count +=
    embed.author?.name?.length || 0;

  count +=
    embed.footer?.text?.length || 0;

  for (
    const field of embed.fields || []
  ) {

    count +=
      field.name?.length || 0;

    count +=
      field.value?.length || 0;

  }

  return count;
}

function validateEmbed(embed) {

  const errors = [];

  if (
    embed.title &&
    embed.title.length > 256
  ) {

    errors.push(
      'Title is over 256 characters.'
    );

  }

  if (
    embed.description &&
    embed.description.length > 4096
  ) {

    errors.push(
      'Description is over 4096 characters.'
    );

  }

  if (
    embed.fields.length > 25
  ) {

    errors.push(
      'An embed can have a maximum of 25 fields.'
    );

  }

  for (
    let index = 0;
    index < embed.fields.length;
    index++
  ) {

    const field =
      embed.fields[index];

    if (
      field.name.length > 256
    ) {

      errors.push(
        `Field ${index + 1} name is over 256 characters.`
      );

    }

    if (
      field.value.length > 1024
    ) {

      errors.push(
        `Field ${index + 1} value is over 1024 characters.`
      );

    }

  }

  if (
    embed.footer?.text &&
    embed.footer.text.length > 2048
  ) {

    errors.push(
      'Footer is over 2048 characters.'
    );

  }

  if (
    embed.author?.name &&
    embed.author.name.length > 256
  ) {

    errors.push(
      'Author name is over 256 characters.'
    );

  }

  if (
    embed.url &&
    !validHttpUrl(embed.url)
  ) {

    errors.push(
      'Title URL must be a valid HTTP/HTTPS URL.'
    );

  }

  for (const url of [
    embed.thumbnail,
    embed.image,
    embed.author?.url,
    embed.author?.iconURL,
    embed.footer?.iconURL
  ]) {

    if (
      url &&
      !validHttpUrl(url)
    ) {

      errors.push(
        'One or more image/icon URLs are invalid.'
      );

      break;

    }

  }

  if (
    embed.color &&
    !normalizeColor(embed.color)
  ) {

    errors.push(
      'Color must be a six-digit hexadecimal color.'
    );

  }

  if (
    embedCharacterCount(embed) > 6000
  ) {

    errors.push(
      'The embed exceeds Discord’s 6000-character limit.'
    );

  }

  return errors;
}

function buildUserEmbed(embed) {

  const result =
    new EmbedBuilder();

  if (embed.title) {
    result.setTitle(
      embed.title
    );
  }

  if (embed.description) {
    result.setDescription(
      embed.description
    );
  }

  const color =
    normalizeColor(
      embed.color
    );

  if (color !== null) {
    result.setColor(color);
  }

  if (embed.url) {
    result.setURL(
      embed.url
    );
  }

  if (embed.timestamp) {
    result.setTimestamp();
  }

  if (
    embed.author?.name
  ) {

    result.setAuthor({

      name:
        embed.author.name,

      url:
        embed.author.url ||
        undefined,

      iconURL:
        embed.author.iconURL ||
        undefined

    });

  }

  if (
    embed.footer?.text
  ) {

    result.setFooter({

      text:
        embed.footer.text,

      iconURL:
        embed.footer.iconURL ||
        undefined

    });

  }

  if (embed.thumbnail) {
    result.setThumbnail(
      embed.thumbnail
    );
  }

  if (embed.image) {
    result.setImage(
      embed.image
    );
  }

  if (
    embed.fields?.length
  ) {

    result.addFields(
      embed.fields.map(
        field => ({

          name:
            field.name,

          value:
            field.value,

          inline:
            Boolean(
              field.inline
            )

        })
      )
    );

  }

  return result;
}

function embedStudioDashboard(
  userId
) {

  const draft =
    getEmbedDraft(userId);

  const embed =
    currentEmbed(userId);

  const errors =
    validateEmbed(embed);

  const preview =
    buildUserEmbed(embed);

  const description =
    [

      '**Advanced Embed Studio**',

      `Embeds: **${draft.embeds.length}/10**`,

      `Fields: **${embed.fields.length}/25**`,

      `Characters: **${embedCharacterCount(embed)}/6000**`,

      `Color: **#${embed.color || 'FFFFFF'}**`,

      `Timestamp: **${embed.timestamp ? 'Enabled' : 'Disabled'}**`,

      errors.length
        ? `\n⚠️ **${errors.length} validation issue(s)**`
        : '\n✅ **Ready to send**'

    ].join('\n');

  const rows = [

    new ActionRowBuilder()
      .addComponents(

        new ButtonBuilder()
          .setCustomId(
            'embed_basic'
          )
          .setLabel(
            'Basic'
          )
          .setStyle(
            ButtonStyle.Primary
          ),

        new ButtonBuilder()
          .setCustomId(
            'embed_media'
          )
          .setLabel(
            'Media'
          )
          .setStyle(
            ButtonStyle.Secondary
          ),

        new ButtonBuilder()
          .setCustomId(
            'embed_author'
          )
          .setLabel(
            'Author'
          )
          .setStyle(
            ButtonStyle.Secondary
          ),

        new ButtonBuilder()
          .setCustomId(
            'embed_footer'
          )
          .setLabel(
            'Footer'
          )
          .setStyle(
            ButtonStyle.Secondary
          )

      ),

    new ActionRowBuilder()
      .addComponents(

        new ButtonBuilder()
          .setCustomId(
            'embed_fields'
          )
          .setLabel(
            'Fields'
          )
          .setStyle(
            ButtonStyle.Secondary
          ),

        new ButtonBuilder()
          .setCustomId(
            'embed_message'
          )
          .setLabel(
            'Message'
          )
          .setStyle(
            ButtonStyle.Secondary
          ),

        new ButtonBuilder()
          .setCustomId(
            'embed_mentions'
          )
          .setLabel(
            'Mentions'
          )
          .setStyle(
            ButtonStyle.Secondary
          ),

        new ButtonBuilder()
          .setCustomId(
            'embed_preview'
          )
          .setLabel(
            'Preview'
          )
          .setStyle(
            ButtonStyle.Primary
          )

      ),

    new ActionRowBuilder()
      .addComponents(

        new ButtonBuilder()
          .setCustomId(
            'embed_send'
          )
          .setLabel(
            'Send'
          )
          .setStyle(
            ButtonStyle.Success
          ),

        new ButtonBuilder()
          .setCustomId(
            'embed_json_export'
          )
          .setLabel(
            'Export JSON'
          )
          .setStyle(
            ButtonStyle.Secondary
          ),

        new ButtonBuilder()
          .setCustomId(
            'embed_json_import'
          )
          .setLabel(
            'Import JSON'
          )
          .setStyle(
            ButtonStyle.Secondary
          ),

        new ButtonBuilder()
          .setCustomId(
            'embed_advanced'
          )
          .setLabel(
            'Advanced'
          )
          .setStyle(
            ButtonStyle.Secondary
          )

      )

  ];

  return {

    content:
      `${description}\n\n` +
      `**Live Preview:**\n${embed.title || '*Untitled Embed*'}\n` +
      `${embed.description || '*No description*'}`,

    embeds: [
      preview
    ],

    components:
      rows,

    ephemeral:
      true

  };

}

function embedFieldsPanel(
  userId
) {

  const draft =
    getEmbedDraft(userId);

  const embed =
    currentEmbed(userId);

  const options =
    embed.fields
      .map(
        (field, index) => ({

          label:
            `${index + 1}. ${field.name || 'Unnamed Field'}`
              .slice(0, 100),

          description:
            `${field.inline ? 'Inline' : 'Full width'} • ${field.value.length} chars`
              .slice(0, 100),

          value:
            String(index)

        })
      );

  const components = [];

  if (options.length) {

    components.push(

      new ActionRowBuilder()
        .addComponents(

          new StringSelectMenuBuilder()
            .setCustomId(
              'embed_field_select'
            )
            .setPlaceholder(
              'Select a field to manage...'
            )
            .addOptions(
              options
            )

        )

    );

  }

  components.push(

    new ActionRowBuilder()
      .addComponents(

        new ButtonBuilder()
          .setCustomId(
            'embed_field_add'
          )
          .setLabel(
            'Add Field'
          )
          .setStyle(
            ButtonStyle.Success
          ),

        new ButtonBuilder()
          .setCustomId(
            'embed_dashboard'
          )
          .setLabel(
            'Back'
          )
          .setStyle(
            ButtonStyle.Secondary
          )

      )

  );

  return {

    content:
      `**Field Manager — ${embed.fields.length}/25**\n\n` +
      (embed.fields.length
        ? 'Select a field below to edit, duplicate, move, or delete it.'
        : 'No fields have been created yet.'),

    components,

    ephemeral:
      true

  };
}

function embedFieldActions(
  index,
  userId
) {

  const embed =
    currentEmbed(userId);

  const field =
    embed.fields[index];

  if (!field) {

    return {
      content:
        'That field no longer exists.',
      ephemeral:
        true
    };

  }

  return {

    content:

      `**Field ${index + 1}**\n\n` +

      `**Name:** ${field.name}\n` +

      `**Value:** ${field.value.slice(0, 1000)}\n\n` +

      `**Inline:** ${field.inline ? 'Yes' : 'No'}`,

    components: [

      new ActionRowBuilder()
        .addComponents(

          new ButtonBuilder()
            .setCustomId(
              `embed_field_edit_${index}`
            )
            .setLabel(
              'Edit'
            )
            .setStyle(
              ButtonStyle.Primary
            ),

          new ButtonBuilder()
            .setCustomId(
              `embed_field_duplicate_${index}`
            )
            .setLabel(
              'Duplicate'
            )
            .setStyle(
              ButtonStyle.Secondary
            ),

          new ButtonBuilder()
            .setCustomId(
              `embed_field_delete_${index}`
            )
            .setLabel(
              'Delete'
            )
            .setStyle(
              ButtonStyle.Danger
            )

        ),

      new ActionRowBuilder()
        .addComponents(

          new ButtonBuilder()
            .setCustomId(
              `embed_field_up_${index}`
            )
            .setLabel(
              'Move Up'
            )
            .setStyle(
              ButtonStyle.Secondary
            ),

          new ButtonBuilder()
            .setCustomId(
              `embed_field_down_${index}`
            )
            .setLabel(
              'Move Down'
            )
            .setStyle(
              ButtonStyle.Secondary
            ),

          new ButtonBuilder()
            .setCustomId(
              'embed_fields'
            )
            .setLabel(
              'Back'
            )
            .setStyle(
              ButtonStyle.Secondary
            )

        )

    ],

    ephemeral:
      true

  };
}

function embedAdvancedPanel(
  userId
) {

  return {

    content:
      '**Advanced Embed Studio**\n\n' +
      'Manage templates, JSON, embeds, and the complete draft.',

    components: [

      new ActionRowBuilder()
        .addComponents(

          new ButtonBuilder()
            .setCustomId(
              'embed_save_template'
            )
            .setLabel(
              'Save Template'
            )
            .setStyle(
              ButtonStyle.Success
            ),

          new ButtonBuilder()
            .setCustomId(
              'embed_load_template'
            )
            .setLabel(
              'Load Template'
            )
            .setStyle(
              ButtonStyle.Primary
            ),

          new ButtonBuilder()
            .setCustomId(
              'embed_reset'
            )
            .setLabel(
              'Reset'
            )
            .setStyle(
              ButtonStyle.Danger
            )

        ),

      new ActionRowBuilder()
        .addComponents(

          new ButtonBuilder()
            .setCustomId(
              'embed_add_embed'
            )
            .setLabel(
              'Add Embed'
            )
            .setStyle(
              ButtonStyle.Success
            ),

          new ButtonBuilder()
            .setCustomId(
              'embed_dashboard'
            )
            .setLabel(
              'Back'
            )
            .setStyle(
              ButtonStyle.Secondary
            )

        )

    ],

    ephemeral:
      true

  };
}

function createEmbedModal(
  type,
  userId,
  fieldIndex = null
) {

  const embed =
    currentEmbed(userId);

  const modal =
    new ModalBuilder();

  if (type === 'basic') {

    return modal
      .setCustomId(
        'embed_modal_basic'
      )
      .setTitle(
        'Basic Embed Settings'
      )
      .addComponents(

        new ActionRowBuilder()
          .addComponents(

            new TextInputBuilder()
              .setCustomId(
                'title'
              )
              .setLabel(
                'Embed Title'
              )
              .setStyle(
                TextInputStyle.Short
              )
              .setRequired(false)
              .setValue(
                embed.title.slice(0, 256)
              )

          ),

        new ActionRowBuilder()
          .addComponents(

            new TextInputBuilder()
              .setCustomId(
                'description'
              )
              .setLabel(
                'Description'
              )
              .setStyle(
                TextInputStyle.Paragraph
              )
              .setRequired(false)
              .setValue(
                embed.description.slice(0, 4096)
              )

          ),

        new ActionRowBuilder()
          .addComponents(

            new TextInputBuilder()
              .setCustomId(
                'color'
              )
              .setLabel(
                'Hex Color'
              )
              .setPlaceholder(
                '#FFFFFF'
              )
              .setStyle(
                TextInputStyle.Short
              )
              .setRequired(false)
              .setValue(
                `#${embed.color || 'FFFFFF'}`
              )

          ),

        new ActionRowBuilder()
          .addComponents(

            new TextInputBuilder()
              .setCustomId(
                'url'
              )
              .setLabel(
                'Title URL'
              )
              .setStyle(
                TextInputStyle.Short
              )
              .setRequired(false)
              .setValue(
                embed.url.slice(0, 1024)
              )

          ),

        new ActionRowBuilder()
          .addComponents(

            new TextInputBuilder()
              .setCustomId(
                'timestamp'
              )
              .setLabel(
                'Timestamp: yes or no'
              )
              .setStyle(
                TextInputStyle.Short
              )
              .setRequired(false)
              .setValue(
                embed.timestamp
                  ? 'yes'
                  : 'no'
              )

          )

      );

  }

  if (type === 'media') {

    return modal
      .setCustomId(
        'embed_modal_media'
      )
      .setTitle(
        'Images & Media'
      )
      .addComponents(

        new ActionRowBuilder()
          .addComponents(

            new TextInputBuilder()
              .setCustomId(
                'image'
              )
              .setLabel(
                'Large Image URL'
              )
              .setStyle(
                TextInputStyle.Short
              )
              .setRequired(false)
              .setValue(
                embed.image.slice(0, 1024)
              )

          ),

        new ActionRowBuilder()
          .addComponents(

            new TextInputBuilder()
              .setCustomId(
                'thumbnail'
              )
              .setLabel(
                'Thumbnail URL'
              )
              .setStyle(
                TextInputStyle.Short
              )
              .setRequired(false)
              .setValue(
                embed.thumbnail.slice(0, 1024)
              )

          )

      );

  }

  if (type === 'author') {

    return modal
      .setCustomId(
        'embed_modal_author'
      )
      .setTitle(
        'Author'
      )
      .addComponents(

        new ActionRowBuilder()
          .addComponents(

            new TextInputBuilder()
              .setCustomId(
                'name'
              )
              .setLabel(
                'Author Name'
              )
              .setStyle(
                TextInputStyle.Short
              )
              .setRequired(false)
              .setValue(
                embed.author.name.slice(0, 256)
              )

          ),

        new ActionRowBuilder()
          .addComponents(

            new TextInputBuilder()
              .setCustomId(
                'url'
              )
              .setLabel(
                'Author URL'
              )
              .setStyle(
                TextInputStyle.Short
              )
              .setRequired(false)
              .setValue(
                embed.author.url.slice(0, 1024)
              )

          ),

        new ActionRowBuilder()
          .addComponents(

            new TextInputBuilder()
              .setCustomId(
                'icon'
              )
              .setLabel(
                'Author Icon URL'
              )
              .setStyle(
                TextInputStyle.Short
              )
              .setRequired(false)
              .setValue(
                embed.author.iconURL.slice(0, 1024)
              )

          )

      );

  }

  if (type === 'footer') {

    return modal
      .setCustomId(
        'embed_modal_footer'
      )
      .setTitle(
        'Footer'
      )
      .addComponents(

        new ActionRowBuilder()
          .addComponents(

            new TextInputBuilder()
              .setCustomId(
                'text'
              )
              .setLabel(
                'Footer Text'
              )
              .setStyle(
                TextInputStyle.Short
              )
              .setRequired(false)
              .setValue(
                embed.footer.text.slice(0, 2048)
              )

          ),

        new ActionRowBuilder()
          .addComponents(

            new TextInputBuilder()
              .setCustomId(
                'icon'
              )
              .setLabel(
                'Footer Icon URL'
              )
              .setStyle(
                TextInputStyle.Short
              )
              .setRequired(false)
              .setValue(
                embed.footer.iconURL.slice(0, 1024)
              )

          )

      );

  }

  if (type === 'message') {

    const draft =
      getEmbedDraft(userId);

    return modal
      .setCustomId(
        'embed_modal_message'
      )
      .setTitle(
        'Message Content'
      )
      .addComponents(

        new ActionRowBuilder()
          .addComponents(

            new TextInputBuilder()
              .setCustomId(
                'content'
              )
              .setLabel(
                'Message Content'
              )
              .setStyle(
                TextInputStyle.Paragraph
              )
              .setRequired(false)
              .setValue(
                draft.content.slice(0, 4000)
              )

          )

      );

  }

  if (type === 'field') {

    const field =
      fieldIndex !== null
        ? embed.fields[fieldIndex]
        : {
            name: '',
            value: '',
            inline: false
          };

    return modal
      .setCustomId(
        fieldIndex === null
          ? 'embed_modal_field_add'
          : `embed_modal_field_edit_${fieldIndex}`
      )
      .setTitle(
        fieldIndex === null
          ? 'Add Field'
          : 'Edit Field'
      )
      .addComponents(

        new ActionRowBuilder()
          .addComponents(

            new TextInputBuilder()
              .setCustomId(
                'name'
              )
              .setLabel(
                'Field Name'
              )
              .setStyle(
                TextInputStyle.Short
              )
              .setRequired(true)
              .setValue(
                field.name.slice(0, 256)
              )

          ),

        new ActionRowBuilder()
          .addComponents(

            new TextInputBuilder()
              .setCustomId(
                'value'
              )
              .setLabel(
                'Field Value'
              )
              .setStyle(
                TextInputStyle.Paragraph
              )
              .setRequired(true)
              .setValue(
                field.value.slice(0, 1024)
              )

          ),

        new ActionRowBuilder()
          .addComponents(

            new TextInputBuilder()
              .setCustomId(
                'inline'
              )
              .setLabel(
                'Inline? yes or no'
              )
              .setStyle(
                TextInputStyle.Short
              )
              .setRequired(false)
              .setValue(
                field.inline
                  ? 'yes'
                  : 'no'
              )

          )

      );

  }

  return null;
}

function getModalValue(
  interaction,
  id
) {

  return interaction.fields
    .getTextInputValue(id)
    .trim();
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
    ),

  new SlashCommandBuilder()
    .setName('embed')
    .setDescription(
      'Open the advanced customizable embed studio.'
    ),

  new SlashCommandBuilder()
    .setName('sync')
    .setDescription(
      'Synchronize all slash commands to this server immediately.'
    )
    .setDefaultMemberPermissions(
      PermissionFlagsBits.Administrator
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
      `${BOT_NAME} IS NOW ONLINE`
    );

    console.log(
      '=================================================='
    );

    console.log(
      `Logged in as: ${client.user.tag}`
    );

    console.log(
      `Application ID: ${client.user.id}`
    );

    console.log(
      `Expected Application ID: ${CLIENT_ID}`
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
      // /SYNC
      // ========================================================

      if (
        interaction.isChatInputCommand() &&
        interaction.commandName === 'sync'
      ) {

        if (!interaction.guild) {
          return interaction.reply({
            content: 'The `/sync` command can only be used inside a server.',
            ephemeral: true
          });
        }

        if (!interaction.memberPermissions?.has(PermissionFlagsBits.Administrator)) {
          return interaction.reply({
            content: 'You need **Administrator** permission to use `/sync`.',
            ephemeral: true
          });
        }

        await interaction.deferReply({ ephemeral: true });

        const rest = new REST({ version: '10' }).setToken(BOT_TOKEN);
        const applicationId = client.user?.id || CLIENT_ID;

        if (!applicationId) {
          return interaction.editReply({
            content: 'Unable to determine the bot application ID.'
          });
        }

        await rest.put(
          Routes.applicationGuildCommands(
            applicationId,
            interaction.guild.id
          ),
          {
            body: commands
          }
        );

        console.log(
          `[SYNC] ${interaction.user.tag} synchronized ${commands.length} commands to ${interaction.guild.name} (${interaction.guild.id}).`
        );

        return interaction.editReply({
          content:
            `**Commands synchronized successfully.**\n\n` +
            `**Server:** ${interaction.guild.name}\n` +
            `**Commands:** ${commands.length}\n` +
            `**Application ID:** ${applicationId}\n\n` +
            `The updated slash commands are now registered specifically for this server.`
        });
      }

      // ========================================================
      // ADVANCED /EMBED
      // ========================================================

      if (
        interaction.isChatInputCommand() &&
        interaction.commandName ===
          'embed'
      ) {

        if (!interaction.guild) {

          return interaction.reply({

            content:
              'The embed studio can only be used inside a server.',

            ephemeral:
              true

          });

        }

        embedDrafts.set(
          interaction.user.id,
          blankEmbedDraft()
        );

        return interaction.reply(
          embedStudioDashboard(
            interaction.user.id
          )
        );

      }

      // ========================================================
      // EMBED BUTTONS
      // ========================================================

      if (
        interaction.isButton() &&
        interaction.customId.startsWith(
          'embed_'
        )
      ) {

        const userId =
          interaction.user.id;

        const draft =
          getEmbedDraft(userId);

        if (
          interaction.customId ===
          'embed_dashboard'
        ) {

          return interaction.update(
            embedStudioDashboard(
              userId
            )
          );

        }

        if (
          interaction.customId ===
          'embed_basic'
        ) {

          return interaction.showModal(
            createEmbedModal(
              'basic',
              userId
            )
          );

        }

        if (
          interaction.customId ===
          'embed_media'
        ) {

          return interaction.showModal(
            createEmbedModal(
              'media',
              userId
            )
          );

        }

        if (
          interaction.customId ===
          'embed_author'
        ) {

          return interaction.showModal(
            createEmbedModal(
              'author',
              userId
            )
          );

        }

        if (
          interaction.customId ===
          'embed_footer'
        ) {

          return interaction.showModal(
            createEmbedModal(
              'footer',
              userId
            )
          );

        }

        if (
          interaction.customId ===
          'embed_message'
        ) {

          return interaction.showModal(
            createEmbedModal(
              'message',
              userId
            )
          );

        }

        if (
          interaction.customId ===
          'embed_fields'
        ) {

          return interaction.update(
            embedFieldsPanel(
              userId
            )
          );

        }

        if (
          interaction.customId ===
          'embed_field_add'
        ) {

          const embed =
            currentEmbed(userId);

          if (
            embed.fields.length >= 25
          ) {

            return interaction.reply({

              content:
                'Discord allows a maximum of 25 fields per embed.',

              ephemeral:
                true

            });

          }

          return interaction.showModal(
            createEmbedModal(
              'field',
              userId
            )
          );

        }

        if (
          interaction.customId ===
          'embed_preview'
        ) {

          const embed =
            currentEmbed(userId);

          const errors =
            validateEmbed(embed);

          if (errors.length) {

            return interaction.reply({

              content:
                '**The embed has validation errors:**\n\n' +
                errors
                  .map(
                    error =>
                      `• ${error}`
                  )
                  .join('\n'),

              ephemeral:
                true

            });

          }

          return interaction.reply({

            content:
              draft.content ||
              undefined,

            embeds: [
              buildUserEmbed(embed)
            ],

            allowedMentions: {
              parse: []
            },

            ephemeral:
              true

          });

        }

        if (
          interaction.customId ===
          'embed_mentions'
        ) {

          return interaction.reply({

            content:
              '**Mention Controls**\n\n' +
              `Users: ${draft.allowedMentions.users ? 'Enabled' : 'Disabled'}\n` +
              `Roles: ${draft.allowedMentions.roles ? 'Enabled' : 'Disabled'}\n` +
              `@everyone/@here: ${draft.allowedMentions.everyone ? 'Enabled' : 'Disabled'}`,

            components: [

              new ActionRowBuilder()
                .addComponents(

                  new ButtonBuilder()
                    .setCustomId(
                      'embed_toggle_users'
                    )
                    .setLabel(
                      'Toggle Users'
                    )
                    .setStyle(
                      draft.allowedMentions.users
                        ? ButtonStyle.Success
                        : ButtonStyle.Secondary
                    ),

                  new ButtonBuilder()
                    .setCustomId(
                      'embed_toggle_roles'
                    )
                    .setLabel(
                      'Toggle Roles'
                    )
                    .setStyle(
                      draft.allowedMentions.roles
                        ? ButtonStyle.Success
                        : ButtonStyle.Secondary
                    ),

                  new ButtonBuilder()
                    .setCustomId(
                      'embed_toggle_everyone'
                    )
                    .setLabel(
                      'Toggle Everyone'
                    )
                    .setStyle(
                      draft.allowedMentions.everyone
                        ? ButtonStyle.Success
                        : ButtonStyle.Secondary
                    )

                ),

              new ActionRowBuilder()
                .addComponents(

                  new ButtonBuilder()
                    .setCustomId(
                      'embed_dashboard'
                    )
                    .setLabel(
                      'Back'
                    )
                    .setStyle(
                      ButtonStyle.Secondary
                    )

                )

            ],

            ephemeral:
              true

          });

        }

        if (
          interaction.customId ===
          'embed_toggle_users'
        ) {

          draft.allowedMentions.users =
            !draft.allowedMentions.users;

          return interaction.update({

            content:
              '**Mention Controls**\n\n' +
              `Users: ${draft.allowedMentions.users ? 'Enabled' : 'Disabled'}\n` +
              `Roles: ${draft.allowedMentions.roles ? 'Enabled' : 'Disabled'}\n` +
              `@everyone/@here: ${draft.allowedMentions.everyone ? 'Enabled' : 'Disabled'}`,

            components:
              interaction.message.components

          });

        }

        if (
          interaction.customId ===
          'embed_toggle_roles'
        ) {

          draft.allowedMentions.roles =
            !draft.allowedMentions.roles;

          return interaction.update({

            content:
              '**Mention Controls**\n\n' +
              `Users: ${draft.allowedMentions.users ? 'Enabled' : 'Disabled'}\n` +
              `Roles: ${draft.allowedMentions.roles ? 'Enabled' : 'Disabled'}\n` +
              `@everyone/@here: ${draft.allowedMentions.everyone ? 'Enabled' : 'Disabled'}`,

            components:
              interaction.message.components

          });

        }

        if (
          interaction.customId ===
          'embed_toggle_everyone'
        ) {

          draft.allowedMentions.everyone =
            !draft.allowedMentions.everyone;

          return interaction.update({

            content:
              '**Mention Controls**\n\n' +
              `Users: ${draft.allowedMentions.users ? 'Enabled' : 'Disabled'}\n` +
              `Roles: ${draft.allowedMentions.roles ? 'Enabled' : 'Disabled'}\n` +
              `@everyone/@here: ${draft.allowedMentions.everyone ? 'Enabled' : 'Disabled'}`,

            components:
              interaction.message.components

          });

        }

        if (
          interaction.customId ===
          'embed_advanced'
        ) {

          return interaction.update(
            embedAdvancedPanel(
              userId
            )
          );

        }

        if (
          interaction.customId ===
          'embed_reset'
        ) {

          embedDrafts.set(
            userId,
            blankEmbedDraft()
          );

          return interaction.update(
            embedStudioDashboard(
              userId
            )
          );

        }

        if (
          interaction.customId ===
          'embed_add_embed'
        ) {

          if (
            draft.embeds.length >= 10
          ) {

            return interaction.reply({

              content:
                'You can create up to 10 embeds in one message.',

              ephemeral:
                true

            });

          }

          draft.embeds.push(
            cloneData(
              blankEmbedDraft().embeds[0]
            )
          );

          return interaction.update(
            embedStudioDashboard(
              userId
            )
          );

        }

        if (
          interaction.customId ===
          'embed_json_export'
        ) {

          const json =
            JSON.stringify(
              draft,
              null,
              2
            );

          if (
            json.length > 1900
          ) {

            return interaction.reply({

              content:
                'Your JSON is too large to display directly in Discord. Use the editor data through the bot logs or reduce the embed size.',

              ephemeral:
                true

            });

          }

          return interaction.reply({

            content:
              `\`\`\`json\n${json}\n\`\`\``,

            ephemeral:
              true

          });

        }

        if (
          interaction.customId ===
          'embed_json_import'
        ) {

          const modal =
            new ModalBuilder()
              .setCustomId(
                'embed_modal_json'
              )
              .setTitle(
                'Import Embed JSON'
              )
              .addComponents(

                new ActionRowBuilder()
                  .addComponents(

                    new TextInputBuilder()
                      .setCustomId(
                        'json'
                      )
                      .setLabel(
                        'Paste Embed JSON'
                      )
                      .setStyle(
                        TextInputStyle.Paragraph
                      )
                      .setRequired(true)

                  )

              );

          return interaction.showModal(
            modal
          );

        }

        if (
          interaction.customId ===
          'embed_save_template'
        ) {

          const modal =
            new ModalBuilder()
              .setCustomId(
                'embed_modal_save_template'
              )
              .setTitle(
                'Save Embed Template'
              )
              .addComponents(

                new ActionRowBuilder()
                  .addComponents(

                    new TextInputBuilder()
                      .setCustomId(
                        'name'
                      )
                      .setLabel(
                        'Template Name'
                      )
                      .setStyle(
                        TextInputStyle.Short
                      )
                      .setRequired(true)
                      .setMaxLength(100)

                  )

              );

          return interaction.showModal(
            modal
          );

        }

        if (
          interaction.customId ===
          'embed_load_template'
        ) {

          const templates =
            embedTemplates.get(
              userId
            ) || {};

          const names =
            Object.keys(
              templates
            );

          if (!names.length) {

            return interaction.reply({

              content:
                'You do not have any saved templates yet.',

              ephemeral:
                true

            });

          }

          const options =
            names
              .slice(0, 25)
              .map(
                name => ({

                  label:
                    name.slice(0, 100),

                  value:
                    name

                })
              );

          return interaction.reply({

            content:
              'Select a saved embed template:',

            components: [

              new ActionRowBuilder()
                .addComponents(

                  new StringSelectMenuBuilder()
                    .setCustomId(
                      'embed_template_select'
                    )
                    .setPlaceholder(
                      'Select a template...'
                    )
                    .addOptions(
                      options
                    )

                )

            ],

            ephemeral:
              true

          });

        }

        if (
          interaction.customId.startsWith(
            'embed_field_edit_'
          )
        ) {

          const index =
            Number(
              interaction.customId
                .split('_')
                .pop()
            );

          return interaction.showModal(
            createEmbedModal(
              'field',
              userId,
              index
            )
          );

        }

        if (
          interaction.customId.startsWith(
            'embed_field_duplicate_'
          )
        ) {

          const index =
            Number(
              interaction.customId
                .split('_')
                .pop()
            );

          const embed =
            currentEmbed(userId);

          if (
            embed.fields.length >= 25
          ) {

            return interaction.reply({

              content:
                'You already have 25 fields.',

              ephemeral:
                true

            });

          }

          const field =
            embed.fields[index];

          if (!field) {
            return interaction.reply({
              content:
                'Field not found.',
              ephemeral:
                true
            });
          }

          embed.fields.splice(
            index + 1,
            0,
            cloneData(field)
          );

          return interaction.update(
            embedFieldsPanel(
              userId
            )
          );

        }

        if (
          interaction.customId.startsWith(
            'embed_field_delete_'
          )
        ) {

          const index =
            Number(
              interaction.customId
                .split('_')
                .pop()
            );

          const embed =
            currentEmbed(userId);

          embed.fields.splice(
            index,
            1
          );

          return interaction.update(
            embedFieldsPanel(
              userId
            )
          );

        }

        if (
          interaction.customId.startsWith(
            'embed_field_up_'
          )
        ) {

          const index =
            Number(
              interaction.customId
                .split('_')
                .pop()
            );

          const embed =
            currentEmbed(userId);

          if (
            index > 0 &&
            embed.fields[index]
          ) {

            [
              embed.fields[index - 1],
              embed.fields[index]
            ] =
            [
              embed.fields[index],
              embed.fields[index - 1]
            ];

          }

          return interaction.update(
            embedFieldsPanel(
              userId
            )
          );

        }

        if (
          interaction.customId.startsWith(
            'embed_field_down_'
          )
        ) {

          const index =
            Number(
              interaction.customId
                .split('_')
                .pop()
            );

          const embed =
            currentEmbed(userId);

          if (
            index <
              embed.fields.length - 1
          ) {

            [
              embed.fields[index],
              embed.fields[index + 1]
            ] =
            [
              embed.fields[index + 1],
              embed.fields[index]
            ];

          }

          return interaction.update(
            embedFieldsPanel(
              userId
            )
          );

        }

        if (
          interaction.customId ===
          'embed_send'
        ) {

          if (!interaction.guild) {

            return interaction.reply({

              content:
                'The embed can only be sent from a server.',

              ephemeral:
                true

            });

          }

          const errors =
            draft.embeds.flatMap(
              (embed, index) =>
                validateEmbed(embed)
                  .map(
                    error =>
                      `Embed ${index + 1}: ${error}`
                  )
            );

          if (errors.length) {

            return interaction.reply({

              content:
                '**Fix these issues before sending:**\n\n' +
                errors
                  .slice(0, 15)
                  .map(
                    error =>
                      `• ${error}`
                  )
                  .join('\n'),

              ephemeral:
                true

            });

          }

          const channels =
            interaction.guild.channels.cache
              .filter(
                channel =>
                  (
                    channel.type ===
                      ChannelType.GuildText ||
                    channel.type ===
                      ChannelType.GuildAnnouncement
                  ) &&
                  channel.viewable &&
                  channel
                    .permissionsFor(
                      interaction.guild.members.me
                    )
                    ?.has(
                      PermissionFlagsBits.SendMessages
                    )
              );

          const options =
            [...channels.values()]
              .slice(0, 25)
              .map(
                channel => ({

                  label:
                    `#${channel.name}`
                      .slice(0, 100),

                  value:
                    channel.id

                })
              );

          if (!options.length) {

            return interaction.reply({

              content:
                'I cannot find a channel where I am allowed to send messages.',

              ephemeral:
                true

            });

          }

          return interaction.reply({

            content:
              'Choose the channel where the embed should be sent:',

            components: [

              new ActionRowBuilder()
                .addComponents(

                  new StringSelectMenuBuilder()
                    .setCustomId(
                      'embed_send_channel'
                    )
                    .setPlaceholder(
                      'Select a channel...'
                    )
                    .addOptions(
                      options
                    )

                )

            ],

            ephemeral:
              true

          });

        }

        return;
      }

      // ========================================================
      // EMBED FIELD SELECT
      // ========================================================

      if (
        interaction.isStringSelectMenu() &&
        interaction.customId ===
          'embed_field_select'
      ) {

        const index =
          Number(
            interaction.values[0]
          );

        return interaction.reply(
          embedFieldActions(
            index,
            interaction.user.id
          )
        );

      }

      // ========================================================
      // EMBED TEMPLATE SELECT
      // ========================================================

      if (
        interaction.isStringSelectMenu() &&
        interaction.customId ===
          'embed_template_select'
      ) {

        const templates =
          embedTemplates.get(
            interaction.user.id
          ) || {};

        const template =
          templates[
            interaction.values[0]
          ];

        if (!template) {

          return interaction.reply({

            content:
              'That template no longer exists.',

            ephemeral:
              true

          });

        }

        embedDrafts.set(
          interaction.user.id,
          cloneData(template)
        );

        return interaction.update(
          embedStudioDashboard(
            interaction.user.id
          )
        );

      }

      // ========================================================
      // EMBED CHANNEL SELECT
      // ========================================================

      if (
        interaction.isStringSelectMenu() &&
        interaction.customId ===
          'embed_send_channel'
      ) {

        if (!interaction.guild) {
          return;
        }

        const channel =
          interaction.guild.channels.cache.get(
            interaction.values[0]
          );

        if (
          !channel ||
          !channel.isTextBased()
        ) {

          return interaction.update({

            content:
              'That channel could not be found.',

            components: []

          });

        }

        const draft =
          getEmbedDraft(
            interaction.user.id
          );

        const errors =
          draft.embeds.flatMap(
            (embed, index) =>
              validateEmbed(embed)
                .map(
                  error =>
                    `Embed ${index + 1}: ${error}`
                )
          );

        if (errors.length) {

          return interaction.update({

            content:
              errors
                .map(
                  error =>
                    `• ${error}`
                )
                .join('\n'),

            components: []

          });

        }

        const embeds =
          draft.embeds.map(
            buildUserEmbed
          );

        const allowedMentions = {

          parse: [

            ...(draft.allowedMentions.users
              ? ['users']
              : []),

            ...(draft.allowedMentions.roles
              ? ['roles']
              : []),

            ...(draft.allowedMentions.everyone
              ? ['everyone']
              : [])

          ]

        };

        await channel.send({

          content:
            draft.content ||
            undefined,

          embeds,

          allowedMentions

        });

        return interaction.update({

          content:
            `✅ Embed message sent successfully to ${channel}.`,

          components: []

        });

      }

      // ========================================================
      // EMBED MODALS
      // ========================================================

      if (
        interaction.isModalSubmit() &&
        interaction.customId.startsWith(
          'embed_modal_'
        )
      ) {

        const userId =
          interaction.user.id;

        const draft =
          getEmbedDraft(userId);

        const embed =
          currentEmbed(userId);

        // ------------------------------------------------------
        // BASIC
        // ------------------------------------------------------

        if (
          interaction.customId ===
          'embed_modal_basic'
        ) {

          const title =
            getModalValue(
              interaction,
              'title'
            );

          const description =
            getModalValue(
              interaction,
              'description'
            );

          const color =
            getModalValue(
              interaction,
              'color'
            );

          const url =
            getModalValue(
              interaction,
              'url'
            );

          const timestamp =
            getModalValue(
              interaction,
              'timestamp'
            );

          if (
            color &&
            !normalizeColor(color)
          ) {

            return interaction.reply({

              content:
                'Color must be a six-digit hex value such as `#FFFFFF` or `5865F2`.',

              ephemeral:
                true

            });

          }

          if (
            url &&
            !validHttpUrl(url)
          ) {

            return interaction.reply({

              content:
                'The title URL must be a valid HTTP/HTTPS URL.',

              ephemeral:
                true

            });

          }

          embed.title =
            title.slice(0, 256);

          embed.description =
            description.slice(0, 4096);

          embed.color =
            color
              .replace(/^#/, '')
              .toUpperCase() ||
            'FFFFFF';

          embed.url =
            url.slice(0, 1024);

          embed.timestamp =
            /^(yes|y|true|on)$/i.test(
              timestamp
            );

          return interaction.reply(
            embedStudioDashboard(
              userId
            )
          );

        }

        // ------------------------------------------------------
        // MEDIA
        // ------------------------------------------------------

        if (
          interaction.customId ===
          'embed_modal_media'
        ) {

          const image =
            getModalValue(
              interaction,
              'image'
            );

          const thumbnail =
            getModalValue(
              interaction,
              'thumbnail'
            );

          if (
            !validHttpUrl(image) ||
            !validHttpUrl(thumbnail)
          ) {

            return interaction.reply({

              content:
                'Image and thumbnail URLs must be valid HTTP/HTTPS URLs.',

              ephemeral:
                true

            });

          }

          embed.image =
            image.slice(0, 1024);

          embed.thumbnail =
            thumbnail.slice(0, 1024);

          return interaction.reply(
            embedStudioDashboard(
              userId
            )
          );

        }

        // ------------------------------------------------------
        // AUTHOR
        // ------------------------------------------------------

        if (
          interaction.customId ===
          'embed_modal_author'
        ) {

          const name =
            getModalValue(
              interaction,
              'name'
            );

          const url =
            getModalValue(
              interaction,
              'url'
            );

          const icon =
            getModalValue(
              interaction,
              'icon'
            );

          if (
            !validHttpUrl(url) ||
            !validHttpUrl(icon)
          ) {

            return interaction.reply({

              content:
                'Author URLs must be valid HTTP/HTTPS URLs.',

              ephemeral:
                true

            });

          }

          embed.author = {

            name:
              name.slice(0, 256),

            url:
              url.slice(0, 1024),

            iconURL:
              icon.slice(0, 1024)

          };

          return interaction.reply(
            embedStudioDashboard(
              userId
            )
          );

        }

        // ------------------------------------------------------
        // FOOTER
        // ------------------------------------------------------

        if (
          interaction.customId ===
          'embed_modal_footer'
        ) {

          const text =
            getModalValue(
              interaction,
              'text'
            );

          const icon =
            getModalValue(
              interaction,
              'icon'
            );

          if (
            !validHttpUrl(icon)
          ) {

            return interaction.reply({

              content:
                'Footer icon URL must be a valid HTTP/HTTPS URL.',

              ephemeral:
                true

            });

          }

          embed.footer = {

            text:
              text.slice(0, 2048),

            iconURL:
              icon.slice(0, 1024)

          };

          return interaction.reply(
            embedStudioDashboard(
              userId
            )
          );

        }

        // ------------------------------------------------------
        // MESSAGE CONTENT
        // ------------------------------------------------------

        if (
          interaction.customId ===
          'embed_modal_message'
        ) {

          draft.content =
            getModalValue(
              interaction,
              'content'
            ).slice(0, 2000);

          return interaction.reply(
            embedStudioDashboard(
              userId
            )
          );

        }

        // ------------------------------------------------------
        // ADD FIELD
        // ------------------------------------------------------

        if (
          interaction.customId ===
          'embed_modal_field_add'
        ) {

          if (
            embed.fields.length >= 25
          ) {

            return interaction.reply({

              content:
                'Discord allows a maximum of 25 fields per embed.',

              ephemeral:
                true

            });

          }

          const name =
            getModalValue(
              interaction,
              'name'
            );

          const value =
            getModalValue(
              interaction,
              'value'
            );

          const inline =
            getModalValue(
              interaction,
              'inline'
            );

          if (
            !name ||
            !value
          ) {

            return interaction.reply({

              content:
                'Field name and value are required.',

              ephemeral:
                true

            });

          }

          if (
            name.length > 256 ||
            value.length > 1024
          ) {

            return interaction.reply({

              content:
                'Field names have a 256-character limit and field values have a 1024-character limit.',

              ephemeral:
                true

            });

          }

          embed.fields.push({

            name:
              name.slice(0, 256),

            value:
              value.slice(0, 1024),

            inline:
              /^(yes|y|true|on)$/i.test(
                inline
              )

          });

          return interaction.reply(
            embedFieldsPanel(
              userId
            )
          );

        }

        // ------------------------------------------------------
        // EDIT FIELD
        // ------------------------------------------------------

        if (
          interaction.customId.startsWith(
            'embed_modal_field_edit_'
          )
        ) {

          const index =
            Number(
              interaction.customId
                .split('_')
                .pop()
            );

          if (
            !embed.fields[index]
          ) {

            return interaction.reply({

              content:
                'That field no longer exists.',

              ephemeral:
                true

            });

          }

          const name =
            getModalValue(
              interaction,
              'name'
            );

          const value =
            getModalValue(
              interaction,
              'value'
            );

          const inline =
            getModalValue(
              interaction,
              'inline'
            );

          if (
            name.length > 256 ||
            value.length > 1024
          ) {

            return interaction.reply({

              content:
                'Field names have a 256-character limit and field values have a 1024-character limit.',

              ephemeral:
                true

            });

          }

          embed.fields[index] = {

            name:
              name.slice(0, 256),

            value:
              value.slice(0, 1024),

            inline:
              /^(yes|y|true|on)$/i.test(
                inline
              )

          };

          return interaction.reply(
            embedFieldsPanel(
              userId
            )
          );

        }

        // ------------------------------------------------------
        // JSON IMPORT
        // ------------------------------------------------------

        if (
          interaction.customId ===
          'embed_modal_json'
        ) {

          const raw =
            getModalValue(
              interaction,
              'json'
            );

          try {

            const imported =
              JSON.parse(raw);

            let normalized;

            if (
              imported.embeds &&
              Array.isArray(
                imported.embeds
              )
            ) {

              normalized =
                imported;

            } else {

              normalized = {

                content:
                  imported.content ||
                  '',

                embeds: [
                  imported
                ],

                allowedMentions: {
                  users: false,
                  roles: false,
                  everyone: false
                }

              };

            }

            if (
              !Array.isArray(
                normalized.embeds
              ) ||
              !normalized.embeds.length
            ) {

              throw new Error(
                'No embeds were found.'
              );

            }

            normalized.embeds =
              normalized.embeds
                .slice(0, 10)
                .map(
                  importedEmbed => ({

                    title:
                      importedEmbed.title ||
                      '',

                    description:
                      importedEmbed.description ||
                      '',

                    color:
                      typeof importedEmbed.color === 'number'
                        ? importedEmbed.color
                            .toString(16)
                            .padStart(6, '0')
                            .toUpperCase()
                        : String(
                            importedEmbed.color ||
                            'FFFFFF'
                          )
                            .replace(/^#/, '')
                            .toUpperCase(),

                    url:
                      importedEmbed.url ||
                      '',

                    timestamp:
                      Boolean(
                        importedEmbed.timestamp
                      ),

                    author: {

                      name:
                        importedEmbed.author?.name ||
                        '',

                      url:
                        importedEmbed.author?.url ||
                        '',

                      iconURL:
                        importedEmbed.author?.icon_url ||
                        importedEmbed.author?.iconURL ||
                        ''

                    },

                    footer: {

                      text:
                        importedEmbed.footer?.text ||
                        '',

                      iconURL:
                        importedEmbed.footer?.icon_url ||
                        importedEmbed.footer?.iconURL ||
                        ''

                    },

                    thumbnail:
                      importedEmbed.thumbnail?.url ||
                      importedEmbed.thumbnail ||
                      '',

                    image:
                      importedEmbed.image?.url ||
                      importedEmbed.image ||
                      '',

                    fields:
                      Array.isArray(
                        importedEmbed.fields
                      )
                        ? importedEmbed.fields
                            .slice(0, 25)
                            .map(
                              field => ({

                                name:
                                  String(
                                    field.name ||
                                    ''
                                  ).slice(0, 256),

                                value:
                                  String(
                                    field.value ||
                                    ''
                                  ).slice(0, 1024),

                                inline:
                                  Boolean(
                                    field.inline
                                  )

                              })
                            )
                        : []

                  })
                );

            normalized.content =
              String(
                normalized.content ||
                ''
              ).slice(0, 2000);

            normalized.allowedMentions = {

              users:
                Boolean(
                  normalized.allowedMentions
                    ?.users
                ),

              roles:
                Boolean(
                  normalized.allowedMentions
                    ?.roles
                ),

              everyone:
                Boolean(
                  normalized.allowedMentions
                    ?.everyone
                )

            };

            embedDrafts.set(
              userId,
              normalized
            );

            return interaction.reply(
              embedStudioDashboard(
                userId
              )
            );

          } catch (error) {

            return interaction.reply({

              content:
                `Unable to import JSON: ${error.message}`,

              ephemeral:
                true

            });

          }

        }

        // ------------------------------------------------------
        // SAVE TEMPLATE
        // ------------------------------------------------------

        if (
          interaction.customId ===
          'embed_modal_save_template'
        ) {

          const name =
            getModalValue(
              interaction,
              'name'
            );

          if (!name) {

            return interaction.reply({

              content:
                'Enter a template name.',

              ephemeral:
                true

            });

          }

          if (
            !embedTemplates.has(userId)
          ) {

            embedTemplates.set(
              userId,
              {}
            );

          }

          const templates =
            embedTemplates.get(
              userId
            );

          templates[
            name.slice(0, 100)
          ] =
            cloneData(
              draft
            );

          return interaction.reply({

            content:
              `✅ Saved template **${name.slice(0, 100)}**.`,

            ephemeral:
              true

          });

        }

      }

      // ========================================================
      // TICKET DROPDOWN
      // ========================================================

      if (
        interaction.isStringSelectMenu() &&
        interaction.customId ===
          'ticket_type'
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
                getTicketOwner(channel) ===
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

        const ticketId =
          Date.now()
            .toString()
            .slice(-6);

        const safeUsername =
          interaction.user.username
            .toLowerCase()
            .replace(
              /[^a-z0-9-]/g,
              ''
            )
            .slice(0, 20) ||
          'member';

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
          const roleId of subject.staffRoles
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

        await ticketChannel.send({

          content:
            `${interaction.user} — your ticket has been opened.`

        });

        const ticketPanel =
          createPanel({

            title:
              subject.label,

            content:
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
        interaction.customId ===
          'claim_ticket'
      ) {

        if (!interaction.channel) return;

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
        interaction.customId ===
          'close_ticket'
      ) {

        if (!interaction.channel) return;

        const ownerId =
          getTicketOwner(
            interaction.channel
          );

        if (
          interaction.user.id !==
            ownerId &&
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

        if (!channel) return;

        const ownerId =
          getTicketOwner(channel);

        const subject =
          getTicketSubject(channel);

        const ticketId =
          getTicketID(channel);

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
          interaction.customId.split('_');

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

        if (
          !VERIFIED_ROLE_ID ||
          !COMMUNITY_MEMBER_ROLE_ID
        ) {

          return interaction.reply({

            content:
              'The verification roles have not been configured correctly.',

            ephemeral:
              true

          });

        }

        const guild =
          interaction.guild;

        if (!guild) {

          return interaction.reply({

            content:
              'Verification can only be completed inside a server.',

            ephemeral:
              true

          });

        }

        const member =
          await guild.members.fetch(
            interaction.user.id
          );

        const botMember =
          guild.members.me ||
          await guild.members.fetch(
            client.user.id
          );

        if (
          !botMember.permissions.has(
            PermissionFlagsBits.ManageRoles
          )
        ) {

          return interaction.reply({

            content:
              'I cannot complete verification because I do not have **Manage Roles** permission.',

            ephemeral:
              true

          });

        }

        const verifiedRole =
          guild.roles.cache.get(
            VERIFIED_ROLE_ID
          );

        const communityRole =
          guild.roles.cache.get(
            COMMUNITY_MEMBER_ROLE_ID
          );

        if (!verifiedRole) {

          return interaction.reply({

            content:
              `I could not find the Verified role (${VERIFIED_ROLE_ID}) in this server.`,

            ephemeral:
              true

          });

        }

        if (!communityRole) {

          return interaction.reply({

            content:
              `I could not find the Community Member role (${COMMUNITY_MEMBER_ROLE_ID}) in this server.`,

            ephemeral:
              true

          });

        }

        const unassignable = [

          verifiedRole,
          communityRole

        ].filter(
          role =>
            role.position >=
            botMember.roles.highest.position
        );

        if (unassignable.length) {

          return interaction.reply({

            content:

              '**Verification cannot assign the required roles.**\n\n' +

              `Move the bot's highest role above: ${unassignable.map(role => `**${role.name}**`).join(', ')}.\n\n` +

              'The bot also needs **Manage Roles** permission.',

            ephemeral:
              true

          });

        }

        const rolesToAdd = [

          VERIFIED_ROLE_ID,
          COMMUNITY_MEMBER_ROLE_ID

        ].filter(
          roleId =>
            !member.roles.cache.has(
              roleId
            )
        );

        if (!rolesToAdd.length) {

          return interaction.reply({

            content:
              'You are already verified and already have the Community Member role.',

            ephemeral:
              true

          });

        }

        await member.roles.add(

          rolesToAdd,

          'Completed BlancoCountyRP verification'

        );

        await interaction.reply({

          content:
            'Verification complete! You have been given the **Verified** and **Community Member** roles.',

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
              'Blanco County Verification',

            content:

              '> Welcome To **Blanco County Verification**, please verify to become a *Blanco County Civilian*.\n\n' +

              '*BlancoCountyRP - Focused On Realism, Professionalism, And More!*',

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

              '**/embed**\n' +
              'Open the advanced customizable embed studio.\n\n' +

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

  if (!client.user) {

    throw new Error(
      'Discord client is not authenticated.'
    );

  }

  const authenticatedApplicationId =
    client.user.id;

  console.log(
    '=================================================='
  );

  console.log(
    'Registering slash commands...'
  );

  console.log(
    `Authenticated Application ID: ${authenticatedApplicationId}`
  );

  console.log(
    `Configured CLIENT_ID: ${CLIENT_ID}`
  );

  console.log(
    `Commands to register: ${commands.length}`
  );

  if (
    CLIENT_ID &&
    authenticatedApplicationId !== CLIENT_ID
  ) {

    console.warn(
      'WARNING: CLIENT_ID does not match the authenticated bot application.'
    );

    console.warn(
      'The bot will use the authenticated application ID.'
    );

  }

  const rest =
    new REST({
      version: '10'
    }).setToken(
      BOT_TOKEN
    );

  try {

    await rest.put(

      Routes.applicationCommands(
        authenticatedApplicationId
      ),

      {
        body:
          commands
      }

    );

    console.log(
      `Successfully registered ${commands.length} slash commands.`
    );

    console.log(
      '=================================================='
    );

    return true;

  } catch (error) {

    console.error(
      'Slash-command registration failed.'
    );

    console.error(
      `HTTP Status: ${error?.status ?? 'unknown'}`
    );

    if (
      error?.status === 401
    ) {

      console.error(
        'Discord returned 401 Unauthorized.'
      );

      console.error(
        'The BOT_TOKEN being used by this process is not accepted by Discord.'
      );

      console.error(
        'Go to Discord Developer Portal → Application → Bot → Reset Token.'
      );

      console.error(
        'Then replace BOT_TOKEN in Render → Environment.'
      );

    } else if (
      error?.status === 403
    ) {

      console.error(
        'Discord returned 403 Forbidden.'
      );

      console.error(
        'Check the application permissions and bot configuration.'
      );

    } else if (
      error?.status === 404
    ) {

      console.error(
        'Discord returned 404 Not Found.'
      );

      console.error(
        'The authenticated application could not be found.'
      );

    }

    throw error;
  }
}

// ============================================================
// START BOT
// ============================================================

async function startBot() {

  console.log(
    '=================================================='
  );

  console.log(
    BOT_NAME
  );

  console.log(
    'Starting bot...'
  );

  console.log(
    '=================================================='
  );

  if (
    !validateEnvironment()
  ) {

    process.exit(1);

  }

  try {

    console.log(
      'Connecting to Discord...'
    );

    await client.login(
      BOT_TOKEN
    );

    if (
      !client.isReady()
    ) {

      await new Promise(
        resolve => {

          client.once(
            'ready',
            resolve
          );

        }
      );

    }

    console.log(
      'Discord authentication successful.'
    );

    console.log(
      `Authenticated as: ${client.user.tag}`
    );

    console.log(
      `Authenticated Bot ID: ${client.user.id}`
    );

    await registerCommands();

    console.log(
      '=================================================='
    );

    console.log(
      `${BOT_NAME} IS NOW ONLINE`
    );

    console.log(
      '=================================================='
    );

    console.log(
      `Logged in as: ${client.user.tag}`
    );

    console.log(
      `Application ID: ${client.user.id}`
    );

    console.log(
      `Server: ${SERVER_NAME}`
    );

    console.log(
      `Status: ${STATUS}`
    );

    console.log(
      `Commands: ${commands.length}`
    );

    console.log(
      '=================================================='
    );

  } catch (error) {

    console.error(
      '=================================================='
    );

    console.error(
      'FAILED TO START BOT'
    );

    console.error(
      '=================================================='
    );

    if (
      error?.status === 401
    ) {

      console.error(
        'DISCORD AUTHENTICATION FAILED: 401 UNAUTHORIZED'
      );

      console.error(
        'Check BOT_TOKEN in Render → Environment.'
      );

      console.error(
        'The token must come from Discord Developer Portal → Bot → Token.'
      );

      console.error(
        'Do NOT use the Client Secret, Public Key, or Application ID as BOT_TOKEN.'
      );

    } else {

      console.error(
        error
      );

    }

    process.exit(1);

  }

}

// ============================================================
// START
// ============================================================

startBot();
