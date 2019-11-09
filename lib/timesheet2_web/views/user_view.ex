defmodule Timesheet2Web.UserView do
  use Timesheet2Web, :view
  alias Timesheet2Web.UserView

  def render("index.json", %{users: users}) do
    %{data: render_many(users, UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, UserView, "user.json")}
  end

  def render("user.json", %{user: user}) do
    %{id: user.id,
      name: user.name,
      email: user.email,
      is_manager: user.is_manager,
      password_hash: user.password_hash}
  end
end
