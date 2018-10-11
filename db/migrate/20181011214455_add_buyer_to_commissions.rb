class AddBuyerToCommissions < ActiveRecord::Migration[5.2]
  def change
    add_reference :commissions, :buyer_id, foreign_key: true
  end
end
