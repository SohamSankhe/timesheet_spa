defmodule Timesheet2.Users.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :email, :string
    field :is_manager, :boolean, default: false
    field :name, :string
    field :password_hash, :string
    field :password, :string, virtual: true

    belongs_to :manager, Timesheet2.Users.User

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :email, :is_manager, :password_hash, :manager_id])
    |> validate_required([:name, :email, :is_manager, :password_hash])
  end
end
