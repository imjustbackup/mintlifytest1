# Self-hosted documentation site

This branch converts the original Mintlify Starter Kit to **Astro + Starlight** so the documentation can be built and hosted independently. Starlight uses `src/content/docs/` for documentation pages and Astro generates the production site. citeturn0search2turn0search14

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The generated static site is placed in `dist/`.

## UGREEN NAS + Cloudflare Tunnel

The intended NAS deployment is:

```
Internet
   |
Cloudflare
   |
Cloudflare Tunnel (outbound connection)
   |
cloudflared container
   |
docs container
   |
Nginx serving Astro's dist/
```

Cloudflare Tunnel uses outbound connections, so the NAS does not need an inbound port-forwarding rule. Cloudflare's current Docker guidance recommends a remotely-managed tunnel. citeturn0search0turn0search9

### 1. Create the Cloudflare tunnel

In Cloudflare:

1. Add your domain to Cloudflare.
2. Go to **Networking → Tunnels**.
3. Create a remotely-managed tunnel.
4. Add a published application route.
5. Set the public hostname to something such as `docs.yourdomain.com`.
6. Set the service URL to `http://docs:80`.

Cloudflare's published-application route maps the public hostname to the local service. citeturn0search1turn0search10

### 2. Put the tunnel token in an environment file

Copy `.env.example` to `.env` and replace the placeholder:

```bash
cp .env.example .env
```

Do **not** commit the real token.

### 3. Deploy on the NAS

From the repository directory:

```bash
docker compose up -d --build
```

Check the containers:

```bash
docker compose ps
docker compose logs -f cloudflared
```

The Cloudflare tunnel and the docs container share a private Docker network. The docs container is not published directly to the NAS host, so there is no need to expose port 80 or 443 to your LAN/router.

### 4. DNS / hostname

Use the hostname configured in the Cloudflare tunnel, for example:

```
https://docs.yourdomain.com
```

Cloudflare handles the public HTTPS endpoint and sends traffic through the tunnel to the NAS. citeturn0search1

## Files

- `src/content/docs/` — documentation
- `src/assets/logo/` — light/dark branding
- `src/styles/custom.css` — visual customization
- `astro.config.mjs` — Starlight configuration
- `Dockerfile` — production image
- `docker-compose.yml` — NAS + Cloudflare deployment
- `.env.example` — tunnel-token template

The original Mintlify-specific `docs.json` remains in the repository as a reference; the self-hosted build does not require Mintlify.
