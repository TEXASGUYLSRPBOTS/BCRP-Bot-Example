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
const SETUP_REPORT_USER_ID = '1062190238866342019';

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
// DASHBOARD / FAQ
// ============================================================


// FAQ adapted from the KCRP FAQ panel, rebranded for BlancoCountyRP.
const FAQ_TEXT =
  '``❓`` **How do I join the Roblox server?**\n' +
  '> Join through the session information when a session is active. Make sure your Roblox and Discord information follow BlancoCountyRP requirements.\n\n' +
  '``❓`` **How do I verify in the server?**\n' +
  '> Click the **Verify** button in the verification panel and follow the instructions.\n\n' +
  '``❓`` **How do I apply for a department?**\n' +
  '> Department applications are available through the server\'s department/application system when applications are open.\n\n' +
  '``❓`` **Can I use any vehicle?**\n' +
  '> No. Some vehicles may be restricted for roleplay purposes. Check the current In-Game Regulations and staff announcements for restrictions.\n\n' +
  '``❓`` **What do I do if I see someone breaking rules?**\n' +
  '> Gather appropriate evidence and report the situation through the proper support channel or ticket system.\n\n' +
  '``❓`` **How do I appeal a moderation action?**\n' +
  '> Open a **Management Support** ticket and provide the information requested by staff.\n\n' +
  '``❓`` **How do I open a support ticket?**\n' +
  '> Go to the BlancoCountyRP Support Hub and select the appropriate ticket type from the dropdown.\n\n' +
  '``❓`` **How do I apply for a partnership?**\n' +
  '> Open a **Management Support** ticket and select the partnership-related support option.';

// ============================================================
// GITHUB ASSETS
// ============================================================

// BlancoCountyRP image assets hosted in the bot repository.
// 3.png = top banner, 4.png = bottom/footer image.
// Components V2 Media Galleries use these direct HTTPS image URLs.
const BLANCO_COUNTY_BACKGROUND_URL =
  'https://raw.githubusercontent.com/TEXASGUYLSRPBOTS/BCRP-Bot-Example/main/assets/3.png';

const BLANCO_COUNTY_BRAND_URL =
  'https://raw.githubusercontent.com/TEXASGUYLSRPBOTS/BCRP-Bot-Example/main/assets/4.png';

const TOP_BANNER_URL = BLANCO_COUNTY_BACKGROUND_URL;
const BOTTOM_FOOTER_URL = BLANCO_COUNTY_BRAND_URL;

const DASHBOARD_BANNER_URL = BLANCO_COUNTY_BACKGROUND_URL;
const DASHBOARD_BOTTOM_IMAGE_URL = BLANCO_COUNTY_BRAND_URL;

const BLANCO_COUNTY_BACKGROUND_TEXT =
  '**Blanco County Background**\n\n' +
  '**BlancoCountyRP** was created by a *Texas Deputy* with a vision to bring the community a realistic and immersive roleplay experience inspired by the area where he works. The goal is to provide professional, enjoyable roleplays while sharing knowledge and insight into law enforcement. With hopes of growing the community, **BlancoCountyRP** aims to create an experience members can enjoy and be proud to be part of.';

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
// ER:LC SESSION SYSTEM
// ============================================================

const SESSION_CHANNEL_ID =
  (process.env.SESSION_CHANNEL_ID || '').trim();

const SESSION_ROLE_ID =
  (process.env.SESSION_ROLE_ID || '').trim();

const SESSION_VOTE_THRESHOLD =
  Math.max(1, Number(process.env.SESSION_VOTE_THRESHOLD || 3));

const SESSION_VOTE_DURATION_MINUTES =
  Math.max(1, Number(process.env.SESSION_VOTE_DURATION_MINUTES || 10));

// ============================================================
// STAFF APPLICATION SYSTEM
// ============================================================

const STAFF_APPLICATION_REVIEW_CHANNEL_ID =
  (process.env.STAFF_APPLICATION_REVIEW_CHANNEL_ID || '').trim();

const STAFF_APPLICATION_CATEGORY_ID =
  (process.env.STAFF_APPLICATION_CATEGORY_ID || '').trim();

const STAFF_APPLICATION_ROLE_ID =
  (process.env.STAFF_APPLICATION_ROLE_ID || SERVER_STAFF_ROLE_ID).trim();

const APPLICATION_CATEGORY_NAME = 'BCRP | Operations';
const APPLICATION_CHANNEL_NAME = '📝 | applications';
const APPLICATION_RESULTS_CHANNEL_NAME = '📋 | application-results';
const APPLICATION_REVIEW_CHANNEL_NAME = '🔒 | application-review';

// ============================================================
// SERVER SETUP / STRUCTURE
// ============================================================

const BCRP_SETUP_CATEGORIES = {
  welcome: 'BCRP | Welcome Center',
  community: 'BCRP | Community',
  operations: 'BCRP | Operations',
  staff: 'BCRP | Staff Area',
  tickets: 'BCRP | Tickets',
  voice: 'BCRP | Voice',
  development: 'BCRP | Under Development'
};

const BCRP_SETUP_CHANNELS = [
  { key: 'welcome', category: 'welcome', name: '👋 | welcome', type: ChannelType.GuildText, readonly: true },
  { key: 'dashboard', category: 'welcome', name: '🏠 | dashboard', type: ChannelType.GuildText, readonly: true },
  { key: 'support', category: 'welcome', name: '🆘 | assistance', type: ChannelType.GuildText, readonly: true },
  { key: 'verify', category: 'welcome', name: '✅ | verify', type: ChannelType.GuildText, readonly: true },

  { key: 'announcements', category: 'community', name: '📢 | announcements', type: ChannelType.GuildText, readonly: true },
  { key: 'sessions', category: 'community', name: '🦌 | sessions', type: ChannelType.GuildText, readonly: true },
  { key: 'polls', category: 'community', name: '📊 | polls', type: ChannelType.GuildText, readonly: true },
  { key: 'general', category: 'community', name: '💬 | general', type: ChannelType.GuildText, readonly: false },
  { key: 'media', category: 'community', name: '📷 | media', type: ChannelType.GuildText, readonly: false },
  { key: 'suggestions', category: 'community', name: '💡 | suggestions', type: ChannelType.GuildText, readonly: false },

  { key: 'departments', category: 'operations', name: '🚔 | departments', type: ChannelType.GuildText, readonly: true },
  { key: 'applications', category: 'operations', name: '📝 | applications', type: ChannelType.GuildText, readonly: true },
  { key: 'application-results', category: 'operations', name: '📋 | application-results', type: ChannelType.GuildText, readonly: true },
  { key: 'application-review', category: 'operations', name: '🔒 | application-review', type: ChannelType.GuildText, readonly: true, staffOnly: true },

  { key: 'staff-announcements', category: 'staff', name: '📢 | staff-announcements', type: ChannelType.GuildText, readonly: true, staffOnly: true },
  { key: 'staff-chat', category: 'staff', name: '💬 | staff-chat', type: ChannelType.GuildText, readonly: false, staffOnly: true },
  { key: 'staff-logs', category: 'staff', name: '📋 | staff-logs', type: ChannelType.GuildText, readonly: true, staffOnly: true },
  { key: 'moderation-logs', category: 'staff', name: '🛡️ | moderation-logs', type: ChannelType.GuildText, readonly: true, staffOnly: true },
  { key: 'staff-training', category: 'staff', name: '🎓 | staff-training', type: ChannelType.GuildText, readonly: false, staffOnly: true },
  { key: 'civilian-lounge', category: 'voice', name: '🏙️ | Civilian Lounge', type: ChannelType.GuildVoice },
  { key: 'leo-lounge', category: 'voice', name: '🚔 | LEO Lounge', type: ChannelType.GuildVoice },
  { key: 'fire-ems-lounge', category: 'voice', name: '🚒 | Fire & EMS Lounge', type: ChannelType.GuildVoice },
  { key: 'staff-lounge', category: 'voice', name: '🔒 | Staff Lounge', type: ChannelType.GuildVoice, staffOnly: true },

  { key: 'development', category: 'development', name: '🛠️ | development', type: ChannelType.GuildText, readonly: false, staffOnly: true },

  { key: 'ticket-category', category: 'tickets', name: 'tickets', type: ChannelType.GuildText, internalCategoryMarker: true }
];

function getBcrpSetupChannel(guild, key) {
  const definition = BCRP_SETUP_CHANNELS.find(channel => channel.key === key);
  if (!definition) return null;
  return guild.channels.cache.find(channel => channel.name === definition.name) || null;
}

function getBcrpSetupCategory(guild, key) {
  const name = BCRP_SETUP_CATEGORIES[key];
  if (!name) return null;
  return guild.channels.cache.find(channel => channel.type === ChannelType.GuildCategory && channel.name === name) || null;
}

function getStaffAccessRoleIds() {
  return [SERVER_STAFF_ROLE_ID, SERVER_MANAGEMENT_ROLE_ID, PARTNERSHIP_TEAM_ROLE_ID].filter(Boolean);
}

function setupPublicOverwrites(guild, readonly = false) {
  const botId = client.user?.id;
  const overwrites = [
    {
      id: guild.roles.everyone.id,
      allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory],
      deny: readonly ? [PermissionFlagsBits.SendMessages] : []
    }
  ];
  if (botId) {
    overwrites.push({
      id: botId,
      allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.EmbedLinks, PermissionFlagsBits.AttachFiles, PermissionFlagsBits.ManageMessages]
    });
  }
  return overwrites;
}

function setupStaffOverwrites(guild, readonly = false) {
  const overwrites = [
    { id: guild.roles.everyone.id, deny: [PermissionFlagsBits.ViewChannel] }
  ];
  for (const roleId of getStaffAccessRoleIds()) {
    overwrites.push({
      id: roleId,
      allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages, PermissionFlagsBits.EmbedLinks, PermissionFlagsBits.AttachFiles],
      deny: readonly ? [PermissionFlagsBits.SendMessages] : []
    });
  }
  if (client.user?.id) {
    overwrites.push({
      id: client.user.id,
      allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages, PermissionFlagsBits.EmbedLinks, PermissionFlagsBits.AttachFiles, PermissionFlagsBits.ManageMessages]
    });
  }
  return overwrites;
}

async function rebuildBcrpServer(guild, options = {}) {
  const protectedChannelId = options.protectedChannelId || null;
  // Remove only resources previously created/marked by this setup system.
  // Unrelated server channels are never touched.
  const managedCategoryIds = new Set();
  const managedChannelIds = new Set();
  const definitionsByName = new Map(BCRP_SETUP_CHANNELS.map(def => [def.name, def]));

  for (const channel of guild.channels.cache.values()) {
    if (!channel) continue;
    const isMarkedText = typeof channel.topic === 'string' && channel.topic.includes('BCRP_SETUP:');
    const isKnownManagedName = definitionsByName.has(channel.name);
    const parent = channel.parentId ? guild.channels.cache.get(channel.parentId) : null;

    if (isMarkedText) {
      managedChannelIds.add(channel.id);
      if (channel.parentId) managedCategoryIds.add(channel.parentId);
    } else if (parent && parent.type === ChannelType.GuildCategory &&
               Object.values(BCRP_SETUP_CATEGORIES).includes(parent.name) && isKnownManagedName) {
      // Voice channels cannot have a topic, so their exact setup name is used
      // only when it is inside a BCRP setup category.
      managedChannelIds.add(channel.id);
      managedCategoryIds.add(parent.id);
    }
  }

  for (const id of managedChannelIds) {
    if (id === protectedChannelId) continue;
    const channel = guild.channels.cache.get(id);
    if (channel) await channel.delete('BlancoCountyRP /setup replacing previous setup').catch(() => {});
  }

  // Delete categories that contained resources created by this setup run.
  // This leaves manually-created categories/channels outside the setup alone.
  for (const id of managedCategoryIds) {
    const category = guild.channels.cache.get(id);
    if (!category || category.type !== ChannelType.GuildCategory) continue;
    const remaining = guild.channels.cache.filter(ch => ch.parentId === category.id);
    for (const child of remaining.values()) {
      await child.delete('BlancoCountyRP /setup replacing previous setup').catch(() => {});
    }
    await category.delete('BlancoCountyRP /setup replacing previous setup').catch(() => {});
  }

  // The private ticket category has no channel topic until tickets exist.
  // Only remove it when it is one of the exact BCRP setup category names.
  const ticketCategory = guild.channels.cache.find(
    ch => ch.type === ChannelType.GuildCategory && ch.name === BCRP_SETUP_CATEGORIES.tickets
  );
  if (ticketCategory) {
    const remaining = guild.channels.cache.filter(ch => ch.parentId === ticketCategory.id);
    if (remaining.size === 0) await ticketCategory.delete('BlancoCountyRP /setup replacing previous setup').catch(() => {});
  }
}

function buildDashboardPanel() {
  const container = new ContainerBuilder().setAccentColor(BRAND_COLOR);
  addMedia(container, DASHBOARD_BANNER_URL);
  container.addTextDisplayComponents(new TextDisplayBuilder().setContent(
    '# BlancoCountyRP Dashboard\n\n' +
    '**Welcome to BlancoCountyRP.**\n' +
    'Welcome to **Blanco County, Texas**, one of ER:LC’s newest roleplay communities. Our goal is to provide a quality, organized roleplay experience with professional departments, clear regulations, and a community built to grow.\n\n' +
    `**${MOTTO}**`
  ));
  const menu = new StringSelectMenuBuilder()
    .setCustomId('bcrp_dashboard_select')
    .setPlaceholder('Explore Blanco County')
    .addOptions(
      { label: 'Server Guidelines', description: 'View the BlancoCountyRP Discord regulations.', value: 'discord_rules', emoji: '☑️' },
      { label: 'In-Game Guidelines', description: 'View the BlancoCountyRP roleplay regulations.', value: 'ingame_rules', emoji: '🎮' },
      { label: 'Frequently Asked Questions', description: 'View frequently asked questions about BlancoCountyRP.', value: 'faq', emoji: '💬' }
    );
  container.addActionRowComponents(new ActionRowBuilder().addComponents(menu));
  addMedia(container, DASHBOARD_BOTTOM_IMAGE_URL);
  return container;
}

function buildTicketPanel() {
  return createPanel({
    title: 'BlancoCountyRP Support Team',
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
    topImage: TICKET_BANNER_URL,
    bottomImage: TICKET_BOTTOM_IMAGE_URL
  });
}

function buildTicketMenu() {
  return new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId('ticket_type')
      .setPlaceholder('Select ticket type...')
      .addOptions(
        { label: 'General Support', description: 'Support which cannot be answered within general.', value: 'general_support' },
        { label: 'Management Support', description: 'For support which needs to be handled by management.', value: 'management_support' }
      )
  );
}

function buildVerificationPanel() {
  return createPanel({
    title: 'Blanco County Verification',
    content: '> Welcome to **Blanco County Verification**. Verify to become a *Blanco County Civilian*.\n\n*BlancoCountyRP — Focused on realism, professionalism, and more!*',
    topImage: VERIFICATION_BANNER_URL,
    bottomImage: VERIFICATION_BOTTOM_IMAGE_URL
  });
}

function buildVerificationButtonRow() {
  return new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId('verify_member').setLabel('Verify').setStyle(ButtonStyle.Primary)
  );
}

function buildDepartmentsPanel() {
  return createTextPanel({
    title: 'BlancoCountyRP Departments',
    content:
      'Your journey at BlancoCountyRP starts here. Explore our departments and become part of the community.\n\n' +
      DEPARTMENTS.map(department => `### ${department.name}\n**${department.abbreviation}**\n${department.description}`).join('\n\n')
  });
}

async function dmSetupReport(guild, result, visibility) {
  try {
    const user = await client.users.fetch(SETUP_REPORT_USER_ID);
    const lines = [];
    lines.push(`BlancoCountyRP Setup Report`);
    lines.push(`Server: ${guild.name}`);
    lines.push(`Guild ID: ${guild.id}`);
    lines.push(`Visibility: ${visibility}`);
    lines.push('');
    lines.push('Categories');
    for (const category of Object.values(result.categories)) {
      lines.push(`((( "${category.name}"="${category.id}" )))`);
    }
    lines.push('');
    lines.push('Channels');
    for (const channel of Object.values(result.channels)) {
      if (!channel?.id) continue;
      const privacy = channel.permissionOverwrites?.cache?.get(guild.roles.everyone.id)?.deny?.has(PermissionFlagsBits.ViewChannel) ? 'PRIVATE' : 'PUBLIC';
      lines.push(`((( "${channel.name}"="${channel.id}" ))) — ${privacy}`);
    }

    const chunks = [];
    let current = '';
    for (const line of lines) {
      if ((current + line + '\n').length > 1800) {
        chunks.push(current);
        current = '';
      }
      current += line + '\n';
    }
    if (current) chunks.push(current);
    for (let i = 0; i < chunks.length; i++) {
      await user.send({ content: `\`\`\`\n${chunks[i]}\`\`\`` });
    }
    return true;
  } catch (error) {
    console.warn(`Could not DM setup report to ${SETUP_REPORT_USER_ID}:`, error.message);
    return false;
  }
}

async function setupBcrpServer(guild, { rebuild = true, visibility = 'recommended' } = {}) {
  if (rebuild) await rebuildBcrpServer(guild, { protectedChannelId: options.protectedChannelId });

  const categories = {};
  for (const [key, name] of Object.entries(BCRP_SETUP_CATEGORIES)) {
    let category = getBcrpSetupCategory(guild, key);
    if (!category) {
      category = await guild.channels.create({
        name,
        type: ChannelType.GuildCategory,
        permissionOverwrites: key === 'staff' || key === 'development' || key === 'tickets'
          ? setupStaffOverwrites(guild, false)
          : undefined
      });
    }
    categories[key] = category;
  }

  const created = {};
  for (const definition of BCRP_SETUP_CHANNELS) {
    if (definition.internalCategoryMarker) continue;
    let channel = guild.channels.cache.find(existing => existing.name === definition.name && existing.parentId === categories[definition.category].id);
    const privateChannel = visibility === 'private' || definition.staffOnly || definition.category === 'staff' || definition.category === 'development' || definition.category === 'tickets';
    if (!channel) {
      channel = await guild.channels.create({
        name: definition.name,
        type: definition.type,
        parent: categories[definition.category].id,
        topic: definition.type === ChannelType.GuildText ? `BCRP_SETUP:${definition.key}` : undefined,
        permissionOverwrites: privateChannel
          ? setupStaffOverwrites(guild, definition.readonly)
          : setupPublicOverwrites(guild, definition.readonly)
      });
    } else {
      if (definition.type === ChannelType.GuildText && !channel.topic?.includes(`BCRP_SETUP:${definition.key}`)) {
        await channel.setTopic(`BCRP_SETUP:${definition.key}`).catch(() => {});
      }
      await channel.permissionOverwrites.set(privateChannel ? setupStaffOverwrites(guild, definition.readonly) : setupPublicOverwrites(guild, definition.readonly)).catch(() => {});
    }
    created[definition.key] = channel;
  }

  // The ticket category is private; ticket channels inherit the staff access and are then narrowed to the opener.
  let ticketCategory = getBcrpSetupCategory(guild, 'tickets');
  if (!ticketCategory) {
    ticketCategory = await guild.channels.create({
      name: BCRP_SETUP_CATEGORIES.tickets,
      type: ChannelType.GuildCategory,
      permissionOverwrites: setupStaffOverwrites(guild, false)
    });
  }
  created.ticketCategory = ticketCategory;

  // Seed the public panels so the new server is usable immediately.
  const seed = [
    ['welcome', { flags: MessageFlags.IsComponentsV2, components: [createPanel({ title: 'Welcome to BlancoCountyRP', content: ABOUT_TEXT + '\n\n**Motto:** ' + MOTTO, topImage: TOP_BANNER_URL, bottomImage: BOTTOM_FOOTER_URL })] }],
    ['dashboard', { flags: MessageFlags.IsComponentsV2, components: [buildDashboardPanel()] }],
    ['support', { flags: MessageFlags.IsComponentsV2, components: [buildTicketPanel(), buildTicketMenu()] }],
    ['verify', { flags: MessageFlags.IsComponentsV2, components: [buildVerificationPanel(), buildVerificationButtonRow()] }],
    ['departments', { flags: MessageFlags.IsComponentsV2, components: [buildDepartmentsPanel()] }],
    ['applications', { flags: MessageFlags.IsComponentsV2, components: [buildApplicationsPanel(), buildApplicationsMenu()] }],
    ['sessions', { flags: MessageFlags.IsComponentsV2, components: [buildSessionPanel(getSessionState(guild.id), guild), buildSessionButtons(getSessionState(guild.id))] }]
  ];

  for (const [key, payload] of seed) {
    const channel = created[key];
    if (!channel || !channel.isTextBased()) continue;
    const setupMarker = `BCRP_SETUP_PANEL:${key}`;
    const existingMarker = channel.topic?.includes(setupMarker);
    if (existingMarker) continue;
    await channel.send(payload).catch(() => {});
    await channel.setTopic(`${channel.topic || `BCRP_SETUP:${key}`}|${setupMarker}`).catch(() => {});
  }

  return { categories, channels: created, ticketCategory };
}

// Applications are intentionally in-memory for this single-file bot.
const staffApplications = new Map();

// One active session/vote per guild. This is intentionally in-memory so the
// core bot stays dependency-free; a database can be added later if needed.
const sessionStates = new Map();

// Staff/moderation records are kept in memory for this single-file build.
const moderationCases = new Map();
const staffNotes = new Map();

function addModerationCase(guildId, entry) {
  const list = moderationCases.get(guildId) || [];
  const id = list.length + 1;
  const record = { id, ...entry, createdAt: Date.now() };
  list.push(record);
  moderationCases.set(guildId, list);
  return record;
}

async function logToBcrpChannel(guild, key, title, content) {
  const channel = getBcrpSetupChannel(guild, key);
  if (!channel || !channel.isTextBased()) return;
  await channel.send({
    flags: MessageFlags.IsComponentsV2,
    components: [createTextPanel({ title, content })]
  }).catch(() => {});
}

function getMemberFromOption(interaction, optionName) {
  return interaction.options.getMember(optionName) || null;
}

async function canModerateTarget(interaction, target) {
  const actor = await interaction.guild.members.fetch(interaction.user.id);
  const me = interaction.guild.members.me || await interaction.guild.members.fetchMe();
  if (!target) return { ok: false, message: 'I could not find that member.' };
  if (target.id === interaction.user.id) return { ok: false, message: 'You cannot moderate yourself.' };
  if (target.id === me.id) return { ok: false, message: 'I cannot moderate myself.' };
  if (target.id === interaction.guild.ownerId) return { ok: false, message: 'The server owner cannot be moderated by this command.' };
  if (actor.id !== interaction.guild.ownerId && target.roles.highest.position >= actor.roles.highest.position) return { ok: false, message: 'You cannot moderate a member with an equal or higher role.' };
  if (target.roles.highest.position >= me.roles.highest.position) return { ok: false, message: 'My highest role must be above the target member.' };
  return { ok: true };
}

// ============================================================
// ENVIRONMENT
// ============================================================

const BOT_TOKEN =
  (process.env.BOT_TOKEN || '').trim();

const CLIENT_ID =
  (process.env.CLIENT_ID || '').trim();

// The guild where slash commands should appear immediately.
// Set GUILD_ID in Render to your BlancoCountyRP server ID.
// Using a guild route prevents the old global-command propagation delay.
const COMMAND_GUILD_ID =
  (process.env.COMMAND_GUILD_ID || '1553088185968631899').trim();

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
  middleImage = '',
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

  if (middleImage) {
    addMedia(container, middleImage);
  }

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
    (TICKET_TRANSCRIPT_CHANNEL_ID && channel.guild.channels.cache.get(TICKET_TRANSCRIPT_CHANNEL_ID)) ||
    getBcrpSetupChannel(channel.guild, 'staff-logs');

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
// STAFF APPLICATION HELPERS
// ============================================================

function createStaffApplicationId() {
  return `BCRP-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
}

function buildApplicationsPanel() {
  return createPanel({
    title: 'BlancoCountyRP | Applications',
    content:
      'Welcome to the official **BlancoCountyRP Applications** area.\n\n' +
      '**Staff Applications**\n' +
      '> Applications are open to members who are **17 or older** and are ready to take on a professional community role.\n' +
      '> Staff members are expected to remain professional, fair, active, and respectful.\n\n' +
      '**Application Process**\n' +
      '> Submit one application at a time.\n' +
      '> Answer every question honestly and with enough detail for Staff Management to review your responses.\n' +
      '> Decisions and official outcomes are posted in the **Results** channel.\n\n' +
      '**Future Department Applications**\n' +
      '> Department applications will be added to this same application system as departments open.\n\n' +
      '*Please do not submit an application simply to test the system.*',
    topImage: TOP_BANNER_URL,
    middleImage: BLANCO_COUNTY_BRAND_URL,
    bottomImage: BOTTOM_FOOTER_URL
  });
}

function buildApplicationsMenu() {
  return new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId('applications_select')
      .setPlaceholder('Select an application type...')
      .addOptions(
        {
          label: 'Staff Application',
          description: 'Apply to join BlancoCountyRP Staff Management.',
          value: 'staff'
        },
        {
          label: 'Department Applications',
          description: 'Department applications will be added here as they open.',
          value: 'department'
        }
      )
  );
}

function buildStaffApplicationPanel() {
  return buildApplicationsPanel();
}

function buildStaffApplicationButtons() {
  return buildApplicationsMenu();
}

function createApplicationResultPanel({ application, status, reviewer, reason = '', roleResult = '' }) {
  const accepted = status === 'accepted';
  const resultText =
    `<@${application.userId}>\n` +
    `**BlancoCountyRP | Staff Application**\n\n` +
    (accepted
      ? 'On behalf of the BlancoCountyRP Staff Management Team, we are pleased to inform you that your application has been **accepted**. We appreciate the time and effort you put into your application and look forward to having you contribute to the community.'
      : 'On behalf of the BlancoCountyRP Staff Management Team, we would like to inform you that your application has been **denied**. We appreciate your interest in joining our team, but unfortunately you did not meet the requirements at this time. Feel free to reapply in the future.') +
    '\n\n' +
    `**Reviewed By:** <@${reviewer}>\n` +
    `**Application ID:** ${application.id}` +
    (accepted && roleResult ? `\n**Role:** ${roleResult}` : '') +
    (!accepted ? `\n**Reason:** ${reason}` : '');

  return createPanel({
    title: accepted ? 'Staff Application — Accepted' : 'Staff Application — Denied',
    content: resultText,
    topImage: TOP_BANNER_URL,
    middleImage: BLANCO_COUNTY_BRAND_URL,
    bottomImage: BOTTOM_FOOTER_URL
  });
}

function getApplicationCategory(guild) {
  return guild.channels.cache.find(
    channel => channel.type === ChannelType.GuildCategory && channel.name === APPLICATION_CATEGORY_NAME
  ) || null;
}

function getApplicationChannel(guild) {
  const category = getApplicationCategory(guild);
  return guild.channels.cache.find(
    channel => channel.type === ChannelType.GuildText &&
      channel.name === APPLICATION_CHANNEL_NAME &&
      (!category || channel.parentId === category.id)
  ) || null;
}

function getApplicationResultsChannel(guild) {
  const category = getApplicationCategory(guild);
  return guild.channels.cache.find(
    channel => channel.type === ChannelType.GuildText &&
      channel.name === APPLICATION_RESULTS_CHANNEL_NAME &&
      (!category || channel.parentId === category.id)
  ) || null;
}

function getApplicationReviewChannel(guild) {
  const category = getApplicationCategory(guild);
  return guild.channels.cache.find(
    channel => channel.type === ChannelType.GuildText &&
      channel.name === APPLICATION_REVIEW_CHANNEL_NAME &&
      (!category || channel.parentId === category.id)
  ) || null;
}

async function setupApplicationChannels(guild) {
  let category = getApplicationCategory(guild);

  if (!category) {
    category = await guild.channels.create({
      name: APPLICATION_CATEGORY_NAME,
      type: ChannelType.GuildCategory
    });
  }

  let applicationsChannel = getApplicationChannel(guild);
  if (!applicationsChannel) {
    applicationsChannel = await guild.channels.create({
      name: APPLICATION_CHANNEL_NAME,
      type: ChannelType.GuildText,
      parent: category.id
    });
  }

  let resultsChannel = getApplicationResultsChannel(guild);
  if (!resultsChannel) {
    resultsChannel = await guild.channels.create({
      name: APPLICATION_RESULTS_CHANNEL_NAME,
      type: ChannelType.GuildText,
      parent: category.id
    });
  }

  let reviewChannel = getApplicationReviewChannel(guild);
  if (!reviewChannel) {
    const overwrites = [
      { id: guild.id, deny: [PermissionFlagsBits.ViewChannel] }
    ];

    if (SERVER_STAFF_ROLE_ID) {
      overwrites.push({
        id: SERVER_STAFF_ROLE_ID,
        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory]
      });
    }

    if (SERVER_MANAGEMENT_ROLE_ID) {
      overwrites.push({
        id: SERVER_MANAGEMENT_ROLE_ID,
        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory]
      });
    }

    reviewChannel = await guild.channels.create({
      name: APPLICATION_REVIEW_CHANNEL_NAME,
      type: ChannelType.GuildText,
      parent: category.id,
      permissionOverwrites: overwrites
    });
  }

  return { category, applicationsChannel, resultsChannel, reviewChannel };
}

function createStaffApplicationModal() {
  const modal = new ModalBuilder()
    .setCustomId('staff_application_modal')
    .setTitle('BlancoCountyRP Staff Application');

  const age = new TextInputBuilder()
    .setCustomId('age')
    .setLabel('Age Eligibility')
    .setStyle(TextInputStyle.Short)
    .setPlaceholder('Confirm you are 17 or older and state your age.')
    .setRequired(true)
    .setMaxLength(100);

  const availability = new TextInputBuilder()
    .setCustomId('availability')
    .setLabel('Availability')
    .setStyle(TextInputStyle.Paragraph)
    .setPlaceholder('Timezone, typical availability, and realistic weekly activity.')
    .setRequired(true)
    .setMaxLength(1000);

  const experience = new TextInputBuilder()
    .setCustomId('experience')
    .setLabel('Experience')
    .setStyle(TextInputStyle.Paragraph)
    .setPlaceholder('Describe previous staff, moderation, leadership, or customer-service experience. Be honest.')
    .setRequired(true)
    .setMaxLength(1500);

  const scenario = new TextInputBuilder()
    .setCustomId('scenario')
    .setLabel('Scenario Response')
    .setStyle(TextInputStyle.Paragraph)
    .setPlaceholder('Two members are arguing and one repeatedly breaks a rule. What steps would you take?')
    .setRequired(true)
    .setMaxLength(1500);

  const motivation = new TextInputBuilder()
    .setCustomId('motivation')
    .setLabel('Why should we choose you?')
    .setStyle(TextInputStyle.Paragraph)
    .setPlaceholder('Why do you want to join staff, and what would you contribute to BlancoCountyRP?')
    .setRequired(true)
    .setMaxLength(1500);

  modal.addComponents(
    new ActionRowBuilder().addComponents(age),
    new ActionRowBuilder().addComponents(availability),
    new ActionRowBuilder().addComponents(experience),
    new ActionRowBuilder().addComponents(scenario),
    new ActionRowBuilder().addComponents(motivation)
  );

  return modal;
}

function staffApplicationReviewPanel(application) {
  const content =
    `# BlancoCountyRP | Staff Application\n\n` +
    `**Applicant:** <@${application.userId}>\n` +
    `**Application ID:** \`${application.id}\`\n` +
    `**Submitted:** <t:${Math.floor(application.createdAt / 1000)}:F>\n\n` +
    `**Age Eligibility**\n${application.answers.age}\n\n` +
    `**Availability**\n${application.answers.availability}\n\n` +
    `**Experience**\n${application.answers.experience}\n\n` +
    `**Scenario Response**\n${application.answers.scenario}\n\n` +
    `**Why should we choose you?**\n${application.answers.motivation}`;

  return createPanel({
    title: 'Staff Application Review',
    content,
    topImage: TOP_BANNER_URL,
    middleImage: BLANCO_COUNTY_BRAND_URL,
    bottomImage: BOTTOM_FOOTER_URL
  });
}

function staffApplicationReviewButtons(id) {
  return new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId(`staff_app_accept_${id}`)
      .setLabel('Accept')
      .setStyle(ButtonStyle.Success),
    new ButtonBuilder()
      .setCustomId(`staff_app_deny_${id}`)
      .setLabel('Deny')
      .setStyle(ButtonStyle.Danger)
  );
}

// ============================================================
// SESSION HELPERS
// ============================================================

function getSessionState(guildId) {
  if (!sessionStates.has(guildId)) {
    sessionStates.set(guildId, {
      status: 'offline',
      code: null,
      notes: 'No special instructions.',
      hostId: null,
      startedAt: null,
      votes: new Set(),
      attendees: new Set(),
      voteMessageId: null,
      sessionMessageId: null
    });
  }
  return sessionStates.get(guildId);
}

function sessionRoleMention() {
  return SESSION_ROLE_ID ? `<@&${SESSION_ROLE_ID}>` : '';
}

function sessionChannel(guild) {
  if (SESSION_CHANNEL_ID) {
    const configured = guild.channels.cache.get(SESSION_CHANNEL_ID);
    if (configured) return configured;
  }
  return getBcrpSetupChannel(guild, 'sessions');
}

function buildSessionPanel(session, guild) {
  const statusLabel =
    session.status === 'started' ? 'Session Started!' :
    session.status === 'voting' ? 'Session Startup' :
    'Session Offline';

  const codeLine = session.status === 'started'
    ? `**Join Code**\n\`\`\`\n${session.code || 'Not provided'}\n\`\`\``
    : '**Join Code**\nThe join code will be provided when the session starts.';

  const attendeeCount = session.attendees.size;
  const voteCount = session.votes.size;

  const content =
    `# ${statusLabel}\n` +
    `We're open **24/7**, aside from short session breaks. Use the controls below to join, leave, or view the current session.\n\n` +
    `### Server Information\n` +
    `> **Status:** \`${statusLabel}\`\n` +
    `> **Players Confirmed:** \`${attendeeCount}\`\n` +
    `> **Host:** ${session.hostId ? `<@${session.hostId}>` : '`Not set`'}\n` +
    (session.status === 'started' && session.startedAt
      ? `> **Started:** <t:${Math.floor(session.startedAt / 1000)}:R>\n`
      : '') +
    (session.status === 'voting'
      ? `> **Startup Votes:** \`${voteCount}/${SESSION_VOTE_THRESHOLD}\`\n`
      : '') +
    `\n${codeLine}\n\n` +
    `### Session Notes\n${session.notes || 'No special instructions.'}\n\n` +
    `*Built by a Vision. Driven by Roleplay.*`;

  const container =
    new ContainerBuilder()
      .setAccentColor(BRAND_COLOR);

  addMedia(container, TOP_BANNER_URL);
  container.addTextDisplayComponents(
    new TextDisplayBuilder().setContent(content)
  );
  addMedia(container, BOTTOM_FOOTER_URL);

  return container;
}

function buildSessionButtons(session) {
  const join = new ButtonBuilder()
    .setCustomId('session_join')
    .setLabel("I'm Joining")
    .setStyle(ButtonStyle.Success)
    .setDisabled(session.status !== 'started');

  const leave = new ButtonBuilder()
    .setCustomId('session_leave')
    .setLabel('Leave')
    .setStyle(ButtonStyle.Secondary)
    .setDisabled(session.status !== 'started');

  const players = new ButtonBuilder()
    .setCustomId('session_players')
    .setLabel('View Players')
    .setStyle(ButtonStyle.Primary);

  const end = new ButtonBuilder()
    .setCustomId('session_end_button')
    .setLabel('End Session')
    .setStyle(ButtonStyle.Danger)
    .setDisabled(session.status !== 'started');

  return new ActionRowBuilder().addComponents(
    join, leave, players, end
  );
}

function isSessionStaff(interaction) {
  if (interaction.memberPermissions?.has(PermissionFlagsBits.ManageMessages)) {
    return true;
  }
  if (SERVER_STAFF_ROLE_ID && interaction.member?.roles?.cache?.has(SERVER_STAFF_ROLE_ID)) {
    return true;
  }
  if (SERVER_MANAGEMENT_ROLE_ID && interaction.member?.roles?.cache?.has(SERVER_MANAGEMENT_ROLE_ID)) {
    return true;
  }
  return false;
}

async function announceSessionMessage(guild, session) {
  const target = sessionChannel(guild) || guild.channels.cache.find(
    channel => channel.isTextBased?.() && channel.permissionsFor(guild.members.me)?.has(PermissionFlagsBits.SendMessages)
  );

  if (!target) return null;

  const prefix = session.status === 'started'
    ? `${sessionRoleMention()}\n`
    : '';

  const message = await target.send({
    content: prefix || undefined,
    flags: MessageFlags.IsComponentsV2,
    components: [buildSessionPanel(session, guild), buildSessionButtons(session)]
  });

  session.sessionMessageId = message.id;
  return message;
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
    .setName('info')
    .setDescription('View server, member, role, and profile information.')
    .addSubcommand(sub => sub.setName('server').setDescription('View detailed server information.'))
    .addSubcommand(sub => sub.setName('user').setDescription('View information about a member.').addUserOption(opt => opt.setName('user').setDescription('Member to inspect.').setRequired(false)))
    .addSubcommand(sub => sub.setName('avatar').setDescription('View a member avatar.').addUserOption(opt => opt.setName('user').setDescription('Member avatar to view.').setRequired(false)))
    .addSubcommand(sub => sub.setName('banner').setDescription('View a member profile banner.').addUserOption(opt => opt.setName('user').setDescription('Member banner to view.').setRequired(false)))
    .addSubcommand(sub => sub.setName('role').setDescription('View information about a role.').addRoleOption(opt => opt.setName('role').setDescription('Role to inspect.').setRequired(true)))
    .addSubcommand(sub => sub.setName('membercount').setDescription('View the current server member count.')),

  new SlashCommandBuilder()
    .setName('moderation')
    .setDescription('Staff moderation tools.')
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .addSubcommand(sub => sub.setName('warn').setDescription('Warn a member.').addUserOption(opt => opt.setName('user').setDescription('Member to warn.').setRequired(true)).addStringOption(opt => opt.setName('reason').setDescription('Reason for the warning.').setRequired(true)))
    .addSubcommand(sub => sub.setName('timeout').setDescription('Temporarily timeout a member.').addUserOption(opt => opt.setName('user').setDescription('Member to timeout.').setRequired(true)).addIntegerOption(opt => opt.setName('minutes').setDescription('Timeout duration in minutes.').setMinValue(1).setMaxValue(40320).setRequired(true)).addStringOption(opt => opt.setName('reason').setDescription('Reason for the timeout.').setRequired(true)))
    .addSubcommand(sub => sub.setName('untimeout').setDescription('Remove a member timeout.').addUserOption(opt => opt.setName('user').setDescription('Member to untimeout.').setRequired(true)).addStringOption(opt => opt.setName('reason').setDescription('Reason for removing the timeout.').setRequired(false)))
    .addSubcommand(sub => sub.setName('kick').setDescription('Kick a member.').addUserOption(opt => opt.setName('user').setDescription('Member to kick.').setRequired(true)).addStringOption(opt => opt.setName('reason').setDescription('Reason for the kick.').setRequired(true)))
    .addSubcommand(sub => sub.setName('ban').setDescription('Ban a member.').addUserOption(opt => opt.setName('user').setDescription('Member to ban.').setRequired(true)).addStringOption(opt => opt.setName('reason').setDescription('Reason for the ban.').setRequired(true)))
    .addSubcommand(sub => sub.setName('unban').setDescription('Unban a user by ID.').addStringOption(opt => opt.setName('user_id').setDescription('Discord user ID.').setRequired(true)).addStringOption(opt => opt.setName('reason').setDescription('Reason for the unban.').setRequired(false)))
    .addSubcommand(sub => sub.setName('clear').setDescription('Delete recent messages.').addIntegerOption(opt => opt.setName('amount').setDescription('Number of messages to delete.').setMinValue(1).setMaxValue(100).setRequired(true))),

  new SlashCommandBuilder()
    .setName('staff')
    .setDescription('Staff-only management and audit tools.')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .addSubcommand(sub => sub.setName('check').setDescription('Check a member for staff roles and permissions.').addUserOption(opt => opt.setName('user').setDescription('Member to check.').setRequired(true)))
    .addSubcommand(sub => sub.setName('note').setDescription('Add a private staff note about a member.').addUserOption(opt => opt.setName('user').setDescription('Member.').setRequired(true)).addStringOption(opt => opt.setName('note').setDescription('Note content.').setRequired(true)))
    .addSubcommand(sub => sub.setName('audit').setDescription('View recent Discord audit log entries.').addIntegerOption(opt => opt.setName('limit').setDescription('Number of entries.').setMinValue(1).setMaxValue(15).setRequired(false))),

  new SlashCommandBuilder()
    .setName('suggest')
    .setDescription('Submit a community suggestion.')
    .addStringOption(opt => opt.setName('idea').setDescription('Your suggestion.').setMinLength(5).setMaxLength(1000).setRequired(true)),

  new SlashCommandBuilder()
    .setName('vote')
    .setDescription('Create a simple community vote.')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .addStringOption(opt => opt.setName('question').setDescription('Question to vote on.').setMaxLength(200).setRequired(true))
    .addStringOption(opt => opt.setName('option_a').setDescription('First option.').setMaxLength(100).setRequired(true))
    .addStringOption(opt => opt.setName('option_b').setDescription('Second option.').setMaxLength(100).setRequired(true)),

  new SlashCommandBuilder()
    .setName('setup')
    .setDescription('Create the BlancoCountyRP under-development server structure.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption(option =>
      option
        .setName('visibility')
        .setDescription('Choose the default visibility for setup channels.')
        .setRequired(false)
        .addChoices(
          { name: 'Recommended — public community, private staff', value: 'recommended' },
          { name: 'Private — staff access by default', value: 'private' }
        )
    ),

  new SlashCommandBuilder()
    .setName('announce')
    .setDescription('Post an official BlancoCountyRP announcement.')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .addStringOption(option => option.setName('message').setDescription('Announcement content.').setMaxLength(1800).setRequired(true)),

  new SlashCommandBuilder()
    .setName('departments')
    .setDescription(
      'View the available departments.'
    ),

  new SlashCommandBuilder()
    .setName('dashboard')
    .setDescription(
      'Send the BlancoCountyRP dashboard and information menu.'
    )
    .setDefaultMemberPermissions(
      PermissionFlagsBits.ManageGuild
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
    .setName('staffapplication')
    .setDescription('Send the BlancoCountyRP staff application panel.')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

  new SlashCommandBuilder()
    .setName('applications')
    .setDescription('Send the BlancoCountyRP application hub.')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

  new SlashCommandBuilder()
    .setName('applicationsetup')
    .setDescription('Create the BlancoCountyRP Applications and Results channels.')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

  new SlashCommandBuilder()
    .setName('session')
    .setDescription('Manage BlancoCountyRP ER:LC sessions.')
    .addSubcommand(subcommand =>
      subcommand
        .setName('vote')
        .setDescription('Open a session startup vote.')
        .addStringOption(option =>
          option
            .setName('notes')
            .setDescription('Optional notes for the session.')
            .setRequired(false)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('start')
        .setDescription('Start an official ER:LC roleplay session.')
        .addStringOption(option =>
          option
            .setName('code')
            .setDescription('The ER:LC private server join code.')
            .setRequired(true)
        )
        .addStringOption(option =>
          option
            .setName('notes')
            .setDescription('Special rules, theme, or information.')
            .setRequired(false)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('status')
        .setDescription('View the current session status.')
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('end')
        .setDescription('End the current ER:LC roleplay session.')
        .addStringOption(option =>
          option
            .setName('reason')
            .setDescription('Optional reason for ending the session.')
            .setRequired(false)
        )
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

        await interaction.deferReply({ flags: MessageFlags.Ephemeral });

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
              getBcrpSetupCategory(guild, 'tickets')?.id ||
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
      // SIMPLE VOTE BUTTONS
      // ========================================================

      if (interaction.isButton() && interaction.customId.startsWith('simplevote_')) {
        const parts = interaction.customId.split('_');
        const choice = parts[1] === 'a' ? 'the first option' : 'the second option';
        return interaction.reply({
          content: `Your vote for **${choice}** has been recorded.`,
          ephemeral: true
        });
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

        {
          const feedbackChannel =
            (TICKET_FEEDBACK_CHANNEL_ID && client.channels.cache.get(TICKET_FEEDBACK_CHANNEL_ID)) ||
            getBcrpSetupChannel(interaction.guild, 'staff-logs');

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
      // /INFO
      // ========================================================

      if (interaction.isChatInputCommand() && interaction.commandName === 'info') {
        if (!interaction.guild) return interaction.reply({ content: 'This command can only be used inside a server.', ephemeral: true });
        const sub = interaction.options.getSubcommand();

        if (sub === 'server') {
          const g = interaction.guild;
          const owner = await g.fetchOwner();
          return interaction.reply({
            flags: MessageFlags.IsComponentsV2,
            components: [createTextPanel({
              title: 'Server Information',
              content:
                `**Name:** ${g.name}\n` +
                `**ID:** \`${g.id}\`\n` +
                `**Owner:** ${owner.user}\n` +
                `**Members:** ${g.memberCount}\n` +
                `**Channels:** ${g.channels.cache.size}\n` +
                `**Roles:** ${g.roles.cache.size}\n` +
                `**Created:** <t:${Math.floor(g.createdTimestamp / 1000)}:F>\n\n` +
                `**Status:** ${STATUS}\n**Motto:** ${MOTTO}`
            })]
          });
        }

        if (sub === 'membercount') {
          return interaction.reply({
            content: `**${interaction.guild.name}** currently has **${interaction.guild.memberCount}** members.`
          });
        }

        if (sub === 'role') {
          const role = interaction.options.getRole('role', true);
          return interaction.reply({
            flags: MessageFlags.IsComponentsV2,
            components: [createTextPanel({
              title: 'Role Information',
              content:
                `**Role:** ${role}\n` +
                `**Name:** ${role.name}\n` +
                `**ID:** \`${role.id}\`\n` +
                `**Position:** ${role.position}\n` +
                `**Members:** ${role.members.size}\n` +
                `**Mentionable:** ${role.mentionable ? 'Yes' : 'No'}\n` +
                `**Managed:** ${role.managed ? 'Yes' : 'No'}`
            })]
          });
        }

        const user = interaction.options.getUser('user') || interaction.user;
        const member = await interaction.guild.members.fetch(user.id).catch(() => null);

        if (sub === 'avatar') {
          return interaction.reply({ content: user.displayAvatarURL({ size: 1024, extension: 'png' }) });
        }

        if (sub === 'banner') {
          const fetched = await user.fetch();
          const banner = fetched.bannerURL({ size: 1024, extension: 'png' });
          return interaction.reply({ content: banner || `${user} does not have a profile banner.` });
        }

        if (sub === 'user') {
          return interaction.reply({
            flags: MessageFlags.IsComponentsV2,
            components: [createTextPanel({
              title: 'User Information',
              content:
                `**User:** ${user}\n` +
                `**Username:** ${user.tag}\n` +
                `**User ID:** \`${user.id}\`\n` +
                `**Account Created:** <t:${Math.floor(user.createdTimestamp / 1000)}:F>\n` +
                `**Joined Server:** ${member?.joinedTimestamp ? `<t:${Math.floor(member.joinedTimestamp / 1000)}:F>` : 'Not a current member'}\n` +
                `**Highest Role:** ${member?.roles?.highest?.name || 'None'}`
            })]
          });
        }
      }

      // ========================================================
      // /MODERATION
      // ========================================================

      if (interaction.isChatInputCommand() && interaction.commandName === 'moderation') {
        if (!interaction.guild) return interaction.reply({ content: 'Moderation commands can only be used inside a server.', ephemeral: true });
        const sub = interaction.options.getSubcommand();
        const target = getMemberFromOption(interaction, 'user');

        if (['warn', 'timeout', 'untimeout', 'kick', 'ban'].includes(sub)) {
          const check = await canModerateTarget(interaction, target);
          if (!check.ok) return interaction.reply({ content: check.message, ephemeral: true });
        }

        if (sub === 'warn') {
          const reason = interaction.options.getString('reason', true);
          const record = addModerationCase(interaction.guild.id, { type: 'Warning', targetId: target.id, targetTag: target.user.tag, moderatorId: interaction.user.id, reason });
          await logToBcrpChannel(interaction.guild, 'moderation-logs', 'Moderation Case', `**Type:** Warning\n**Member:** ${target.user.tag}\n**Case:** #${record.id}\n**Moderator:** ${interaction.user}\n**Reason:** ${reason}`);
          return interaction.reply({
            flags: MessageFlags.IsComponentsV2,
            components: [createStatusPanel('Warning Issued', `${target} has received a warning.\n\n**Case:** #${record.id}\n**Reason:** ${reason}\n**Moderator:** ${interaction.user}`)]
          });
        }

        if (sub === 'timeout') {
          const minutes = interaction.options.getInteger('minutes', true);
          const reason = interaction.options.getString('reason', true);
          await target.timeout(minutes * 60 * 1000, reason);
          const record = addModerationCase(interaction.guild.id, { type: 'Timeout', targetId: target.id, targetTag: target.user.tag, moderatorId: interaction.user.id, reason, duration: minutes });
          await logToBcrpChannel(interaction.guild, 'moderation-logs', 'Moderation Case', `**Type:** Timeout\n**Member:** ${target.user.tag}\n**Duration:** ${minutes} minutes\n**Case:** #${record.id}\n**Moderator:** ${interaction.user}\n**Reason:** ${reason}`);
          return interaction.reply({
            flags: MessageFlags.IsComponentsV2,
            components: [createStatusPanel('Timeout Applied', `${target} has been timed out for **${minutes} minutes**.\n\n**Case:** #${record.id}\n**Reason:** ${reason}`)]
          });
        }

        if (sub === 'untimeout') {
          const reason = interaction.options.getString('reason') || 'No reason provided.';
          await target.timeout(null, reason);
          const record = addModerationCase(interaction.guild.id, { type: 'Untimeout', targetId: target.id, targetTag: target.user.tag, moderatorId: interaction.user.id, reason });
          await logToBcrpChannel(interaction.guild, 'moderation-logs', 'Moderation Case', `**Type:** Untimeout\n**Member:** ${target.user.tag}\n**Case:** #${record.id}\n**Moderator:** ${interaction.user}\n**Reason:** ${reason}`);
          return interaction.reply({
            flags: MessageFlags.IsComponentsV2,
            components: [createStatusPanel('Timeout Removed', `${target} is no longer timed out.\n\n**Case:** #${record.id}`)]
          });
        }

        if (sub === 'kick') {
          const reason = interaction.options.getString('reason', true);
          await target.kick(reason);
          const record = addModerationCase(interaction.guild.id, { type: 'Kick', targetId: target.id, targetTag: target.user.tag, moderatorId: interaction.user.id, reason });
          await logToBcrpChannel(interaction.guild, 'moderation-logs', 'Moderation Case', `**Type:** Kick\n**Member:** ${target.user.tag}\n**Case:** #${record.id}\n**Moderator:** ${interaction.user}\n**Reason:** ${reason}`);
          return interaction.reply({
            flags: MessageFlags.IsComponentsV2,
            components: [createStatusPanel('Member Kicked', `**Member:** ${target.user.tag}\n**Case:** #${record.id}\n**Reason:** ${reason}`)]
          });
        }

        if (sub === 'ban') {
          const reason = interaction.options.getString('reason', true);
          await target.ban({ reason });
          const record = addModerationCase(interaction.guild.id, { type: 'Ban', targetId: target.id, targetTag: target.user.tag, moderatorId: interaction.user.id, reason });
          await logToBcrpChannel(interaction.guild, 'moderation-logs', 'Moderation Case', `**Type:** Ban\n**Member:** ${target.user.tag}\n**Case:** #${record.id}\n**Moderator:** ${interaction.user}\n**Reason:** ${reason}`);
          return interaction.reply({
            flags: MessageFlags.IsComponentsV2,
            components: [createStatusPanel('Member Banned', `**Member:** ${target.user.tag}\n**Case:** #${record.id}\n**Reason:** ${reason}`)]
          });
        }

        if (sub === 'unban') {
          const userId = interaction.options.getString('user_id', true).trim();
          const reason = interaction.options.getString('reason') || 'No reason provided.';
          await interaction.guild.members.unban(userId, reason);
          const record = addModerationCase(interaction.guild.id, { type: 'Unban', targetId: userId, moderatorId: interaction.user.id, reason });
          await logToBcrpChannel(interaction.guild, 'moderation-logs', 'Moderation Case', `**Type:** Unban\n**User ID:** ${userId}\n**Case:** #${record.id}\n**Moderator:** ${interaction.user}\n**Reason:** ${reason}`);
          return interaction.reply({
            flags: MessageFlags.IsComponentsV2,
            components: [createStatusPanel('User Unbanned', `**User ID:** \`${userId}\`\n**Case:** #${record.id}\n**Reason:** ${reason}`)]
          });
        }

        if (sub === 'clear') {
          if (!interaction.channel || !interaction.channel.isTextBased()) return interaction.reply({ content: 'This command must be used in a text channel.', ephemeral: true });
          const amount = interaction.options.getInteger('amount', true);
          await interaction.deferReply({ ephemeral: true });
          const deleted = await interaction.channel.bulkDelete(amount, true);
          addModerationCase(interaction.guild.id, { type: 'Clear', targetId: interaction.channel.id, moderatorId: interaction.user.id, reason: `Deleted ${deleted.size} messages.` });
          return interaction.editReply(`Deleted **${deleted.size}** messages.`);
        }
      }

      // ========================================================
      // /STAFF
      // ========================================================

      if (interaction.isChatInputCommand() && interaction.commandName === 'staff') {
        if (!interaction.guild) return interaction.reply({ content: 'Staff commands can only be used inside a server.', ephemeral: true });
        const sub = interaction.options.getSubcommand();

        if (sub === 'check') {
          const user = interaction.options.getUser('user', true);
          const member = await interaction.guild.members.fetch(user.id).catch(() => null);
          if (!member) return interaction.reply({ content: 'That user is not currently in the server.', ephemeral: true });
          return interaction.reply({
            flags: MessageFlags.IsComponentsV2,
            components: [createTextPanel({
              title: 'Staff Member Check',
              content:
                `**User:** ${member.user}\n` +
                `**Highest Role:** ${member.roles.highest}\n` +
                `**Staff Role:** ${member.roles.cache.has(SERVER_STAFF_ROLE_ID) ? 'Yes' : 'No'}\n` +
                `**Management Role:** ${member.roles.cache.has(SERVER_MANAGEMENT_ROLE_ID) ? 'Yes' : 'No'}\n` +
                `**Administrator:** ${member.permissions.has(PermissionFlagsBits.Administrator) ? 'Yes' : 'No'}\n` +
                `**Manage Server:** ${member.permissions.has(PermissionFlagsBits.ManageGuild) ? 'Yes' : 'No'}`
            })]
          });
        }

        if (sub === 'note') {
          const user = interaction.options.getUser('user', true);
          const note = interaction.options.getString('note', true);
          const list = staffNotes.get(user.id) || [];
          list.push({ note, authorId: interaction.user.id, createdAt: Date.now() });
          staffNotes.set(user.id, list);
          return interaction.reply({ content: `Staff note saved for **${user.tag}**.`, ephemeral: true });
        }

        if (sub === 'audit') {
          const limit = interaction.options.getInteger('limit') || 10;
          const logs = await interaction.guild.fetchAuditLogs({ limit });
          const entries = [...logs.entries.values()].slice(0, limit);
          const text = entries.length
            ? entries.map(entry => `> **${entry.action}** — ${entry.executor ? entry.executor.tag : 'Unknown'} — <t:${Math.floor(entry.createdTimestamp / 1000)}:R>`).join('\n')
            : 'No audit log entries were found.';
          return interaction.reply({
            flags: MessageFlags.IsComponentsV2,
            components: [createTextPanel({ title: 'Recent Audit Log', content: text })]
          });
        }
      }

      // ========================================================
      // /ANNOUNCE
      // ========================================================

      if (interaction.isChatInputCommand() && interaction.commandName === 'announce') {
        if (!interaction.guild) return interaction.reply({ content: 'Announcements can only be posted inside a server.', ephemeral: true });
        const message = interaction.options.getString('message', true);
        const channel = getBcrpSetupChannel(interaction.guild, 'announcements') || interaction.channel;
        if (!channel?.isTextBased()) return interaction.reply({ content: 'I could not find an announcements channel.', ephemeral: true });
        await channel.send({
          flags: MessageFlags.IsComponentsV2,
          components: [createPanel({ title: 'BlancoCountyRP Announcement', content: message, topImage: TOP_BANNER_URL, bottomImage: BOTTOM_FOOTER_URL })]
        });
        return interaction.reply({ content: `Announcement posted in ${channel}.`, ephemeral: true });
      }

      // ========================================================
      // /SUGGEST
      // ========================================================

      if (interaction.isChatInputCommand() && interaction.commandName === 'suggest') {
        const idea = interaction.options.getString('idea', true);
        const channel = getBcrpSetupChannel(interaction.guild, 'suggestions') || interaction.guild?.systemChannel;
        if (channel && channel.isTextBased()) {
          await channel.send({
            flags: MessageFlags.IsComponentsV2,
            components: [createTextPanel({
              title: 'BlancoCountyRP Suggestion',
              content: `**Suggestion:**\n${idea}\n\n**Submitted by:** ${interaction.user}`
            })]
          }).catch(() => {});
        }
        return interaction.reply({ content: 'Your suggestion has been submitted.', ephemeral: true });
      }

      // ========================================================
      // /VOTE
      // ========================================================

      if (interaction.isChatInputCommand() && interaction.commandName === 'vote') {
        const question = interaction.options.getString('question', true);
        const a = interaction.options.getString('option_a', true);
        const b = interaction.options.getString('option_b', true);
        const voteId = Date.now().toString(36);
        const row = new ActionRowBuilder().addComponents(
          new ButtonBuilder().setCustomId(`simplevote_a_${voteId}`).setLabel(a).setStyle(ButtonStyle.Secondary),
          new ButtonBuilder().setCustomId(`simplevote_b_${voteId}`).setLabel(b).setStyle(ButtonStyle.Secondary)
        );
        const panel = createPanel({
          title: 'Community Vote',
          content: `**${question}**\n\nChoose one of the options below.`,
          topImage: TOP_BANNER_URL,
          bottomImage: BOTTOM_FOOTER_URL
        });
        return interaction.reply({ flags: MessageFlags.IsComponentsV2, components: [panel, row] });
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
      // /SETUP
      // ========================================================

      if (interaction.isChatInputCommand() && interaction.commandName === 'setup') {
        if (!interaction.guild) {
          return interaction.reply({ content: 'Server setup can only be used inside a server.', ephemeral: true });
        }
        if (!interaction.memberPermissions?.has(PermissionFlagsBits.Administrator)) {
          return interaction.reply({ content: 'You need **Administrator** permission to use `/setup`.', ephemeral: true });
        }

        const visibility = interaction.options.getString('visibility') || 'recommended';
        await interaction.deferReply({ ephemeral: true });

        try {
          const result = await setupBcrpServer(interaction.guild, { rebuild: true, visibility, protectedChannelId: interaction.channelId });
          const textChannels = Object.values(result.channels).filter(channel => channel?.type === ChannelType.GuildText).length;
          const voiceChannels = Object.values(result.channels).filter(channel => channel?.type === ChannelType.GuildVoice).length;
          const dmSent = await dmSetupReport(interaction.guild, result, visibility);

          await interaction.editReply({
            content:
              `**BlancoCountyRP server setup complete.**\n\n` +
              `**Area:** BCRP | Under Development\n` +
              `**Visibility:** ${visibility === 'private' ? 'Private by default' : 'Recommended'}\n` +
              `**Categories:** ${Object.keys(result.categories).length}\n` +
              `**Text Channels:** ${textChannels}\n` +
              `**Voice Channels:** ${voiceChannels}\n\n` +
              `Previous channels created by this setup were removed and recreated. Unrelated server channels were left alone.\n` +
              `The dashboard, assistance, verification, applications, departments, and sessions panels were seeded automatically.\n\n` +
              `**Setup report DM:** ${dmSent ? 'Sent to <@${SETUP_REPORT_USER_ID}>.' : 'Could not be sent; check the bot DMs/privacy settings.'}`
          });
        } catch (error) {
          console.error('BCRP setup error:', error);
          const errorText = `Server setup stopped because Discord returned an error: **${error.message}**`;
          try {
            if (interaction.replied || interaction.deferred) {
              await interaction.editReply({ content: errorText });
            } else {
              await interaction.reply({ content: errorText, flags: MessageFlags.Ephemeral });
            }
          } catch (replyError) {
            console.error('Unable to send setup error response:', replyError);
          }
        }
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
      // APPLICATION HUB / SETUP
      // ========================================================

      if (
        interaction.isChatInputCommand() &&
        (interaction.commandName === 'applications' || interaction.commandName === 'staffapplication')
      ) {
        if (!interaction.guild) {
          return interaction.reply({
            content: 'Applications can only be posted inside a server.',
            ephemeral: true
          });
        }

        if (!interaction.memberPermissions?.has(PermissionFlagsBits.ManageGuild)) {
          return interaction.reply({
            content: 'You need **Manage Server** permission to post the application panel.',
            ephemeral: true
          });
        }

        await interaction.reply({
          flags: MessageFlags.IsComponentsV2,
          components: [buildApplicationsPanel(), buildApplicationsMenu()]
        });
        return;
      }

      if (
        interaction.isChatInputCommand() &&
        interaction.commandName === 'applicationsetup'
      ) {
        if (!interaction.guild) {
          return interaction.reply({ content: 'Application setup can only be used inside a server.', ephemeral: true });
        }

        if (!interaction.memberPermissions?.has(PermissionFlagsBits.ManageGuild)) {
          return interaction.reply({ content: 'You need **Manage Server** permission to set up applications.', ephemeral: true });
        }

        const { applicationsChannel, resultsChannel, reviewChannel } = await setupApplicationChannels(interaction.guild);

        await applicationsChannel.send({
          flags: MessageFlags.IsComponentsV2,
          components: [buildApplicationsPanel(), buildApplicationsMenu()]
        });

        return interaction.reply({
          content: `Application system is ready.\n\nApplications: <#${applicationsChannel.id}>\nResults: <#${resultsChannel.id}>\nInternal Review: <#${reviewChannel.id}>`,
          ephemeral: true
        });
      }

      // ========================================================
      // APPLICATION SELECT MENU
      // ========================================================

      if (interaction.isStringSelectMenu() && interaction.customId === 'applications_select') {
        const selected = interaction.values[0];

        if (selected === 'staff') {
          return interaction.showModal(createStaffApplicationModal());
        }

        if (selected === 'department') {
          return interaction.reply({
            content: 'Department applications will be added to this same application system as departments open.',
            ephemeral: true
          });
        }
      }

      // ========================================================
      // STAFF APPLICATION BUTTONS
      // ========================================================

      if (interaction.isButton()) {
        if (interaction.customId === 'staff_apply_open') {
          return interaction.showModal(createStaffApplicationModal());
        }

        if (interaction.customId === 'staff_apply_requirements') {
          return interaction.reply({
            flags: MessageFlags.IsComponentsV2,
            components: [createPanel({
              title: 'Staff Application Requirements',
              content:
                '**Minimum requirement:** 17+\n\n' +
                '> You must be able to communicate professionally.\n' +
                '> You should have reasonable availability for the role.\n' +
                '> You must be willing to enforce rules consistently and fairly.\n' +
                '> Previous staff experience is helpful, but honesty and judgment matter more than a title.\n' +
                '> Do not apply if you are unable to meet the age requirement.\n\n' +
                '*Applications are reviewed individually by Staff Management.*',
              topImage: TOP_BANNER_URL,
              bottomImage: BOTTOM_FOOTER_URL
            })],
            ephemeral: true
          });
        }

        if (interaction.customId.startsWith('staff_app_accept_')) {
          if (!isSessionStaff(interaction)) {
            return interaction.reply({ content: 'You need staff management permissions to review applications.', ephemeral: true });
          }

          const id = interaction.customId.replace('staff_app_accept_', '');
          const application = staffApplications.get(id);
          if (!application) {
            return interaction.reply({ content: 'That application is no longer available.', ephemeral: true });
          }
          if (application.status !== 'pending') {
            return interaction.reply({ content: `This application has already been ${application.status}.`, ephemeral: true });
          }

          application.status = 'accepted';
          application.reviewedBy = interaction.user.id;

          let roleResult = 'No staff role was assigned.';
          if (STAFF_APPLICATION_ROLE_ID) {
            try {
              const member = await interaction.guild.members.fetch(application.userId);
              const me = interaction.guild.members.me || await interaction.guild.members.fetchMe();
              const role = interaction.guild.roles.cache.get(STAFF_APPLICATION_ROLE_ID);
              if (role && me.permissions.has(PermissionFlagsBits.ManageRoles) && role.position < me.roles.highest.position) {
                await member.roles.add(role, `Accepted BlancoCountyRP staff application ${id}`);
                roleResult = `Assigned <@&${role.id}>.`;
              } else {
                roleResult = 'Application accepted, but the configured staff role could not be assigned. Check Manage Roles and role hierarchy.';
              }
            } catch {
              roleResult = 'Application accepted, but the staff role could not be assigned.';
            }
          }

          const resultText =
            `<@${application.userId}>\n` +
            `**BlancoCountyRP | Staff Application**\n` +
            `On behalf of the BlancoCountyRP Staff Management Team, we are pleased to inform you that your application has been **accepted**. We appreciate the time and effort you put into your application and look forward to having you contribute to the community.\n\n` +
            `**Reviewed By:** <@${interaction.user.id}>\n` +
            `**Application ID:** \`${id}\`\n` +
            `**Role:** ${roleResult}`;

          try {
            const user = await client.users.fetch(application.userId);
            await user.send({ content: resultText });
          } catch {}

          const resultsChannel = getApplicationResultsChannel(interaction.guild);
          if (resultsChannel) {
            await resultsChannel.send({
              flags: MessageFlags.IsComponentsV2,
              components: [createApplicationResultPanel({
                application,
                status: 'accepted',
                reviewer: interaction.user.id,
                roleResult
              })]
            });
          }

          return interaction.update({
            components: [createApplicationResultPanel({
              application,
              status: 'accepted',
              reviewer: interaction.user.id,
              roleResult
            })]
          });
        }

        if (interaction.customId.startsWith('staff_app_deny_')) {
          if (!isSessionStaff(interaction)) {
            return interaction.reply({ content: 'You need staff management permissions to review applications.', ephemeral: true });
          }

          const id = interaction.customId.replace('staff_app_deny_', '');
          const application = staffApplications.get(id);
          if (!application) {
            return interaction.reply({ content: 'That application is no longer available.', ephemeral: true });
          }
          if (application.status !== 'pending') {
            return interaction.reply({ content: `This application has already been ${application.status}.`, ephemeral: true });
          }

          const modal = new ModalBuilder()
            .setCustomId(`staff_app_deny_modal_${id}`)
            .setTitle('Deny Staff Application');
          const reason = new TextInputBuilder()
            .setCustomId('reason')
            .setLabel('Reason for denial')
            .setStyle(TextInputStyle.Paragraph)
            .setPlaceholder('Provide a clear, professional reason for the decision.')
            .setRequired(true)
            .setMaxLength(1500);
          modal.addComponents(new ActionRowBuilder().addComponents(reason));
          return interaction.showModal(modal);
        }
      }

      // ========================================================
      // STAFF APPLICATION MODALS
      // ========================================================

      if (interaction.isModalSubmit()) {
        if (interaction.customId === 'staff_application_modal') {
          const age = getModalValue(interaction, 'age');
          const availability = getModalValue(interaction, 'availability');
          const experience = getModalValue(interaction, 'experience');
          const scenario = getModalValue(interaction, 'scenario');
          const motivation = getModalValue(interaction, 'motivation');

          const ageMatch = age.match(/\b(\d{2})\b/);
          if (!ageMatch || Number(ageMatch[1]) < 17) {
            return interaction.reply({
              content: 'BlancoCountyRP staff applications require applicants to be **17 or older**.',
              ephemeral: true
            });
          }

          const id = createStaffApplicationId();
          const application = {
            id,
            userId: interaction.user.id,
            createdAt: Date.now(),
            status: 'pending',
            reviewedBy: null,
            answers: { age, availability, experience, scenario, motivation },
            reviewChannelId: null,
            reviewMessageId: null
          };
          staffApplications.set(id, application);

          let reviewChannel = getApplicationReviewChannel(interaction.guild);
          if (!reviewChannel && STAFF_APPLICATION_REVIEW_CHANNEL_ID) {
            reviewChannel = interaction.guild?.channels.cache.get(STAFF_APPLICATION_REVIEW_CHANNEL_ID) || null;
          }
          if (!reviewChannel) {
            reviewChannel = interaction.channel;
          }

          const reviewMessage = await reviewChannel.send({
            flags: MessageFlags.IsComponentsV2,
            components: [staffApplicationReviewPanel(application), staffApplicationReviewButtons(id)]
          });

          application.reviewChannelId = reviewChannel.id;
          application.reviewMessageId = reviewMessage.id;

          return interaction.reply({
            content: `Your staff application has been submitted successfully. **Application ID:** \`${id}\`\n\nStaff Management will review your application.`,
            ephemeral: true
          });
        }

        if (interaction.customId.startsWith('staff_app_deny_modal_')) {
          if (!isSessionStaff(interaction)) {
            return interaction.reply({ content: 'You need staff management permissions to review applications.', ephemeral: true });
          }

          const id = interaction.customId.replace('staff_app_deny_modal_', '');
          const application = staffApplications.get(id);
          if (!application) {
            return interaction.reply({ content: 'That application is no longer available.', ephemeral: true });
          }
          if (application.status !== 'pending') {
            return interaction.reply({ content: `This application has already been ${application.status}.`, ephemeral: true });
          }

          const reason = getModalValue(interaction, 'reason');
          application.status = 'denied';
          application.reviewedBy = interaction.user.id;
          application.denialReason = reason;

          const resultText =
            `<@${application.userId}>\n` +
            `**BlancoCountyRP | Staff Application**\n` +
            `On behalf of the BlancoCountyRP Staff Management Team, we would like to inform you that your application has been **denied**. We appreciate your interest in joining our team, but unfortunately you did not meet the requirements at this time. Feel free to reapply in the future.\n` +
            `**Reason:** ${reason}`;

          try {
            const user = await client.users.fetch(application.userId);
            await user.send({ content: resultText });
          } catch {}

          const resultsChannel = getApplicationResultsChannel(interaction.guild);
          if (resultsChannel) {
            await resultsChannel.send({
              flags: MessageFlags.IsComponentsV2,
              components: [createApplicationResultPanel({
                application,
                status: 'denied',
                reviewer: interaction.user.id,
                reason
              })]
            });
          }

          return interaction.update({
            components: [createApplicationResultPanel({
              application,
              status: 'denied',
              reviewer: interaction.user.id,
              reason
            })]
          });
        }
      }

      // ========================================================
      // /SESSION
      // ========================================================

      if (
        interaction.isChatInputCommand() &&
        interaction.commandName === 'session'
      ) {
        if (!interaction.guild) {
          return interaction.reply({
            content: 'Sessions can only be managed inside a server.',
            ephemeral: true
          });
        }

        if (!isSessionStaff(interaction)) {
          return interaction.reply({
            content: 'You need staff permissions to manage sessions.',
            ephemeral: true
          });
        }

        const subcommand = interaction.options.getSubcommand();
        const session = getSessionState(interaction.guild.id);

        if (subcommand === 'vote') {
          if (session.status === 'started') {
            return interaction.reply({
              content: 'A session is already active.',
              ephemeral: true
            });
          }

          session.status = 'voting';
          session.hostId = interaction.user.id;
          session.notes = interaction.options.getString('notes') || 'No special instructions.';
          session.votes = new Set([interaction.user.id]);
          session.attendees = new Set();

          const channel = sessionChannel(interaction.guild) || interaction.channel;
          const roleMention = sessionRoleMention();
          const message = await channel.send({
            content: roleMention || undefined,
            flags: MessageFlags.IsComponentsV2,
            components: [
              buildSessionPanel(session, interaction.guild),
              new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId('session_vote').setLabel('Vote to Start').setStyle(ButtonStyle.Success),
                new ButtonBuilder().setCustomId('session_vote_remove').setLabel('Remove Vote').setStyle(ButtonStyle.Secondary),
                new ButtonBuilder().setCustomId('session_vote_status').setLabel('View Votes').setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId('session_vote_cancel').setLabel('Cancel Vote').setStyle(ButtonStyle.Danger)
              )
            ]
          });

          session.voteMessageId = message.id;

          await interaction.reply({
            content: `Session startup vote opened in <#${channel.id}>. **${session.votes.size}/${SESSION_VOTE_THRESHOLD}** votes are currently recorded.`,
            ephemeral: true
          });

          return;
        }

        if (subcommand === 'start') {
          session.status = 'started';
          session.code = interaction.options.getString('code', true);
          session.notes = interaction.options.getString('notes') || 'No special instructions.';
          session.hostId = interaction.user.id;
          session.startedAt = Date.now();
          session.votes.clear();
          session.attendees.clear();

          const message = await announceSessionMessage(interaction.guild, session);

          if (!message) {
            return interaction.reply({
              content: 'I could not find a channel where I can announce the session.',
              ephemeral: true
            });
          }

          return interaction.reply({
            content: `**Session Started!** The official session panel has been posted in <#${message.channel.id}>.`,
            ephemeral: true
          });
        }

        if (subcommand === 'status') {
          const started = session.status === 'started' && session.startedAt;
          const duration = started
            ? Math.floor((Date.now() - session.startedAt) / 60000)
            : 0;

          return interaction.reply({
            flags: MessageFlags.IsComponentsV2,
            components: [buildSessionPanel(session, interaction.guild)],
            ephemeral: true
          });
        }

        if (subcommand === 'end') {
          if (session.status !== 'started') {
            return interaction.reply({
              content: 'There is no active session to end.',
              ephemeral: true
            });
          }

          const reason = interaction.options.getString('reason') || 'Session concluded.';
          session.status = 'offline';
          session.code = null;
          session.startedAt = null;
          session.votes.clear();
          session.attendees.clear();

          const channel = sessionChannel(interaction.guild) || interaction.channel;
          await channel.send({
            flags: MessageFlags.IsComponentsV2,
            components: [createPanel({
              title: 'Session Ended',
              content: `The BlancoCountyRP roleplay session has concluded.\n\n**Reason:** ${reason}\n\n*Thank you for participating in BlancoCountyRP.*`,
              topImage: TOP_BANNER_URL,
              bottomImage: BOTTOM_FOOTER_URL
            })]
          });

          return interaction.reply({
            content: 'The current session has been ended.',
            ephemeral: true
          });
        }
      }

      // ========================================================
      // SESSION BUTTONS
      // ========================================================

      if (interaction.isButton() && interaction.guild) {
        const session = getSessionState(interaction.guild.id);

        if (interaction.customId === 'session_join') {
          if (session.status !== 'started') {
            return interaction.reply({ content: 'There is no active session.', ephemeral: true });
          }
          session.attendees.add(interaction.user.id);
          return interaction.update({
            components: [buildSessionPanel(session, interaction.guild), buildSessionButtons(session)]
          });
        }

        if (interaction.customId === 'session_leave') {
          session.attendees.delete(interaction.user.id);
          return interaction.update({
            components: [buildSessionPanel(session, interaction.guild), buildSessionButtons(session)]
          });
        }

        if (interaction.customId === 'session_players') {
          const players = [...session.attendees];
          return interaction.reply({
            content: players.length
              ? `**Confirmed Players (${players.length})**\n${players.map(id => `• <@${id}>`).join('\n')}`
              : 'No players have confirmed attendance yet.',
            ephemeral: true
          });
        }

        if (interaction.customId === 'session_end_button') {
          if (!isSessionStaff(interaction)) {
            return interaction.reply({ content: 'You need staff permissions to end the session.', ephemeral: true });
          }
          if (session.status !== 'started') {
            return interaction.reply({ content: 'There is no active session.', ephemeral: true });
          }

          session.status = 'offline';
          session.code = null;
          session.startedAt = null;
          session.votes.clear();
          session.attendees.clear();

          return interaction.update({
            components: [createPanel({
              title: 'Session Ended',
              content: 'The BlancoCountyRP roleplay session has concluded.\n\n*Thank you for participating in BlancoCountyRP.*',
              topImage: TOP_BANNER_URL,
              bottomImage: BOTTOM_FOOTER_URL
            })]
          });
        }

        if (interaction.customId === 'session_vote') {
          if (session.status !== 'voting') {
            return interaction.reply({ content: 'There is no active session startup vote.', ephemeral: true });
          }
          session.votes.add(interaction.user.id);
          if (session.votes.size >= SESSION_VOTE_THRESHOLD) {
            session.status = 'voting';
            return interaction.update({
              components: [buildSessionPanel(session, interaction.guild), new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId('session_vote').setLabel('Vote to Start').setStyle(ButtonStyle.Success),
                new ButtonBuilder().setCustomId('session_vote_remove').setLabel('Remove Vote').setStyle(ButtonStyle.Secondary),
                new ButtonBuilder().setCustomId('session_vote_status').setLabel('View Votes').setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId('session_vote_cancel').setLabel('Cancel Vote').setStyle(ButtonStyle.Danger)
              )]
            });
          }
          return interaction.update({
            components: [buildSessionPanel(session, interaction.guild), new ActionRowBuilder().addComponents(
              new ButtonBuilder().setCustomId('session_vote').setLabel('Vote to Start').setStyle(ButtonStyle.Success),
              new ButtonBuilder().setCustomId('session_vote_remove').setLabel('Remove Vote').setStyle(ButtonStyle.Secondary),
              new ButtonBuilder().setCustomId('session_vote_status').setLabel('View Votes').setStyle(ButtonStyle.Primary),
              new ButtonBuilder().setCustomId('session_vote_cancel').setLabel('Cancel Vote').setStyle(ButtonStyle.Danger)
            )]
          });
        }

        if (interaction.customId === 'session_vote_remove') {
          session.votes.delete(interaction.user.id);
          return interaction.update({
            components: [buildSessionPanel(session, interaction.guild), new ActionRowBuilder().addComponents(
              new ButtonBuilder().setCustomId('session_vote').setLabel('Vote to Start').setStyle(ButtonStyle.Success),
              new ButtonBuilder().setCustomId('session_vote_remove').setLabel('Remove Vote').setStyle(ButtonStyle.Secondary),
              new ButtonBuilder().setCustomId('session_vote_status').setLabel('View Votes').setStyle(ButtonStyle.Primary),
              new ButtonBuilder().setCustomId('session_vote_cancel').setLabel('Cancel Vote').setStyle(ButtonStyle.Danger)
            )]
          });
        }

        if (interaction.customId === 'session_vote_status') {
          return interaction.reply({
            content: `**Session Startup Votes:** ${session.votes.size}/${SESSION_VOTE_THRESHOLD}\n${session.votes.size ? [...session.votes].map(id => `• <@${id}>`).join('\n') : 'No votes yet.'}`,
            ephemeral: true
          });
        }

        if (interaction.customId === 'session_vote_cancel') {
          if (!isSessionStaff(interaction)) {
            return interaction.reply({ content: 'You need staff permissions to cancel the vote.', ephemeral: true });
          }
          session.status = 'offline';
          session.votes.clear();
          session.hostId = null;
          return interaction.update({
            components: [createPanel({
              title: 'Session Vote Cancelled',
              content: 'The BlancoCountyRP session startup vote has been cancelled.',
              topImage: TOP_BANNER_URL,
              bottomImage: BOTTOM_FOOTER_URL
            })]
          });
        }
      }

      // ========================================================
      // /DASHBOARD
      // ========================================================

      if (
        interaction.isChatInputCommand() &&
        interaction.commandName ===
          'dashboard'
      ) {

        if (
          !interaction.memberPermissions?.has(
            PermissionFlagsBits.ManageGuild
          )
        ) {
          return interaction.reply({
            content:
              'You need **Manage Server** permission to use `/dashboard`.',
            ephemeral: true
          });
        }

        const container =
          new ContainerBuilder()
            .setAccentColor(BRAND_COLOR);

        // Top banner — same visual structure as the reference dashboard.
        addMedia(
          container,
          DASHBOARD_BANNER_URL
        );

        container.addTextDisplayComponents(
          new TextDisplayBuilder().setContent(
            '# BlancoCountyRP Dashboard\n\n' +
            '**Welcome to BlancoCountyRP.**\n' +
            'Welcome to **Blanco County, Texas**, one of ER:LC\'s newest roleplay communities. Our goal is to provide a quality, organized roleplay experience with professional departments, clear regulations, and a community built to grow.\n\n' +
            '**Built by a Vision. Driven by Roleplay.**'
          )
        );

        const menu =
          new StringSelectMenuBuilder()
            .setCustomId('bcrp_dashboard_select')
            .setPlaceholder('Explore Blanco County')
            .addOptions(
              {
                label: 'Server Guidelines',
                description: 'View the BlancoCountyRP Discord regulations.',
                value: 'discord_rules',
                emoji: '☑️'
              },
              {
                label: 'In-Game Guidelines',
                description: 'View the BlancoCountyRP roleplay regulations.',
                value: 'ingame_rules',
                emoji: '🎮'
              },
              {
                label: 'Frequently Asked Questions',
                description: 'View frequently asked questions about BlancoCountyRP.',
                value: 'faq',
                emoji: '💬'
              }
            );

        container.addActionRowComponents(
          new ActionRowBuilder().addComponents(menu)
        );

        addMedia(
          container,
          DASHBOARD_BOTTOM_IMAGE_URL
        );

        await interaction.reply({
          flags: MessageFlags.IsComponentsV2,
          components: [container]
        });

        return;
      }

      // ========================================================
      // DASHBOARD SELECT MENU
      // ========================================================

      if (
        interaction.isStringSelectMenu() &&
        interaction.customId ===
          'bcrp_dashboard_select'
      ) {

        const choice = interaction.values[0];

        if (choice === 'discord_rules') {
          const chunks = splitText(DISCORD_REGULATIONS_TEXT);
          const panels = chunks.map((chunk, index) =>
            createTextPanel({
              title:
                chunks.length > 1
                  ? `Server Guidelines • ${index + 1}/${chunks.length}`
                  : 'Server Guidelines',
              content: chunk
            })
          );

          return interaction.reply({
            flags: MessageFlags.IsComponentsV2,
            components: panels
          });
        }

        if (choice === 'ingame_rules') {
          const chunks = splitText(INGAME_REGULATIONS_TEXT);
          const panels = chunks.map((chunk, index) =>
            createTextPanel({
              title:
                chunks.length > 1
                  ? `In-Game Guidelines • ${index + 1}/${chunks.length}`
                  : 'In-Game Guidelines',
              content: chunk
            })
          );

          return interaction.reply({
            flags: MessageFlags.IsComponentsV2,
            components: panels
          });
        }

        if (choice === 'faq') {
          const faqPanel = createPanel({
            title: 'Frequently Asked Questions',
            content: FAQ_TEXT,
            topImage: TOP_BANNER_URL,
            bottomImage: BOTTOM_FOOTER_URL
          });

          return interaction.reply({
            flags: MessageFlags.IsComponentsV2,
            components: [faqPanel]
          });
        }
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

              '**/dashboard**\n' +
              'Send the BlancoCountyRP dashboard and information menu.\n\n' +

              '**/info**\n' +
              'Server, user, avatar, banner, role, and member-count tools.\n\n' +

              '**/moderation**\n' +
              'Staff moderation tools for warnings, timeouts, kicks, bans, and message cleanup.\n\n' +

              '**/staff**\n' +
              'Staff checks, notes, and audit tools.\n\n' +

              '**/suggest**\n' +
              'Submit a community suggestion.\n\n' +

              '**/vote**\n' +
              'Create a two-option community vote.\n\n' +

              '**/setup**\n' +
              'Build or rebuild the BlancoCountyRP server structure.\n\n' +

              '**/announce**\n' +
              'Post an official announcement to the announcements channel.\n\n' +

              '**/departments**\n' +
              'View available departments.\n\n'

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
          new ContainerBuilder()
            .setAccentColor(BRAND_COLOR);

        addMedia(panel, BLANCO_COUNTY_BACKGROUND_URL);

        panel.addTextDisplayComponents(
          new TextDisplayBuilder().setContent(
            '# Blanco County Background\n\n' +
            '**BlancoCountyRP** was created by a *Texas Deputy* with a vision to bring the community a realistic and immersive roleplay experience inspired by the area where he works. The goal is to provide professional, enjoyable roleplays while sharing knowledge and insight into law enforcement. With hopes of growing the community, **BlancoCountyRP** aims to create an experience members can enjoy and be proud to be part of.\n\n' +
            `**Motto:** ${MOTTO}\n` +
            `**Status:** ${STATUS}\n` +
            `[Join BlancoCountyRP](${DISCORD_INVITE})`
          )
        );

        addMedia(panel, BLANCO_COUNTY_BRAND_URL);

        panel.addTextDisplayComponents(
          new TextDisplayBuilder().setContent(
            '# BlancoCountyRP\n\n' +
            'Focused on realism, professionalism, and building a community members can be proud to be part of.\n\n' +
            `**Motto:** ${MOTTO}\n` +
            `**Status:** ${STATUS}`
          )
        );

        addMedia(panel, BOTTOM_FOOTER_URL);

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
    `Command registration scope: ${COMMAND_GUILD_ID ? `GUILD ${COMMAND_GUILD_ID}` : 'GLOBAL'}`
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

    // Always replace the command set instead of appending to it.
    // This removes stale duplicates when the bot was previously using
    // global commands and then switched to guild-specific registration.
    if (COMMAND_GUILD_ID) {

      // Remove EVERY global command first. This eliminates any old KCRP
      // command set that was previously registered globally.
      await rest.put(
        Routes.applicationCommands(
          authenticatedApplicationId
        ),
        {
          body: []
        }
      );

      // Remove guild commands from every server this bot is currently in.
      // This prevents old KCRP command sets from surviving in guild scope.
      // The only guild we intentionally repopulate afterward is BCRP.
      const botGuilds = client.guilds.cache.map(guild => guild.id);

      for (const guildId of botGuilds) {
        try {
          await rest.put(
            Routes.applicationGuildCommands(
              authenticatedApplicationId,
              guildId
            ),
            {
              body: []
            }
          );

          console.log(
            `[COMMAND CLEANUP] Cleared guild commands from ${guildId}.`
          );
        } catch (cleanupError) {
          console.warn(
            `[COMMAND CLEANUP] Could not clear guild ${guildId}: ${cleanupError?.message || cleanupError}`
          );
        }
      }

      // Register ONLY the current BCRP command set in the target guild.
      await rest.put(
        Routes.applicationGuildCommands(
          authenticatedApplicationId,
          COMMAND_GUILD_ID
        ),
        {
          body: commands
        }
      );

      // Verify Discord returned the complete command set.
      const registered = await rest.get(
        Routes.applicationGuildCommands(
          authenticatedApplicationId,
          COMMAND_GUILD_ID
        )
      );

      const registeredNames = Array.isArray(registered)
        ? registered.map(command => command.name)
        : [];

      console.log(
        `Successfully registered ${registeredNames.length} guild slash commands to ${COMMAND_GUILD_ID}.`
      );

      console.log(
        `Registered commands: ${registeredNames.join(', ')}`
      );

      console.log(
        'Old global slash commands were cleared to prevent duplicates.'
      );

    } else {

      // Fallback for deployments that intentionally want global commands.
      // Global commands can take time to propagate to Discord clients.
      await rest.put(
        Routes.applicationCommands(
          authenticatedApplicationId
        ),
        {
          body: commands
        }
      );

      console.log(
        `Successfully registered ${commands.length} global slash commands.`
      );

    }

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