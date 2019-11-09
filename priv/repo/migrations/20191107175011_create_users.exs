defmodule Timesheet2.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :name, :string
      add :email, :string
      add :is_manager, :boolean, default: false, null: false
      add :password_hash, :string
      add :manager_id, references(:users), null: true
      timestamps()
    end

  end
end
