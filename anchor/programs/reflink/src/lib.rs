#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF");

#[program]
pub mod reflink {
    use super::*;

  pub fn close(_ctx: Context<CloseReflink>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.reflink.count = ctx.accounts.reflink.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.reflink.count = ctx.accounts.reflink.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeReflink>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.reflink.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeReflink<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + Reflink::INIT_SPACE,
  payer = payer
  )]
  pub reflink: Account<'info, Reflink>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseReflink<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub reflink: Account<'info, Reflink>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub reflink: Account<'info, Reflink>,
}

#[account]
#[derive(InitSpace)]
pub struct Reflink {
  count: u8,
}
