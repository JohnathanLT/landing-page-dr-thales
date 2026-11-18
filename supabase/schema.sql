-- Modelo de produção: validar requisitos jurídicos, segurança e retenção antes de ativar.
-- Nenhuma conexão com Supabase é configurada nesta demonstração.
create extension if not exists pgcrypto;

create table if not exists public.pacientes (
  id uuid primary key default gen_random_uuid(),
  dados jsonb not null,
  arquivado boolean not null default false,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

create table if not exists public.anamneses (
  id uuid primary key default gen_random_uuid(),
  paciente_id uuid not null references public.pacientes(id),
  versao integer not null,
  conteudo jsonb not null,
  status text not null check (status in ('rascunho', 'finalizada')),
  criada_em timestamptz not null default now(),
  finalizada_em timestamptz,
  unique (paciente_id, versao)
);

create table if not exists public.atendimentos (
  id uuid primary key default gen_random_uuid(),
  paciente_id uuid not null references public.pacientes(id),
  dados jsonb not null,
  status text not null check (status in ('em andamento', 'encerrado')),
  inicio_em timestamptz not null,
  fim_em timestamptz,
  criado_em timestamptz not null default now()
);

create table if not exists public.auditoria (
  id uuid primary key default gen_random_uuid(),
  entidade text not null,
  entidade_id uuid not null,
  acao text not null,
  quem uuid not null,
  detalhe jsonb,
  quando timestamptz not null default now()
);

alter table public.pacientes enable row level security;
alter table public.anamneses enable row level security;
alter table public.atendimentos enable row level security;
alter table public.auditoria enable row level security;

-- RLS de produção (exemplo a revisar; requer identidade autenticada e vínculo médico/paciente):
-- create policy "somente equipe autorizada" on public.pacientes
--   for all to authenticated using (auth.uid() = (dados->>'medico_id')::uuid)
--   with check (auth.uid() = (dados->>'medico_id')::uuid);
-- Repetir políticas equivalentes nas demais tabelas e validar acesso por paciente.
-- Restringir UPDATE/DELETE de registros finalizados; correções somente por adendos auditados.
-- Nunca publicar uma chave de serviço no cliente. Usar anon key somente após auditoria das policies.
