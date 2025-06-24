import "dotenv/config";
import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import process from "process";

const app = express();

app.use(cors());
app.use(express.json());

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// ======================================================= 
// ROTAS DO PAINEL DE ADMIN
// =======================================================

// Rota para CRIAR um novo animal. Acesso só para adms
app.post("/pets", async (req, res) => {
  try {
    const { nome, age, species, breed, description, imagelink } = req.body;

    // Tenta inserir na tabela 'pets', mapeando os nomes CORRETAMENTE
    const { data, error } = await supabaseAdmin
      .from("pets")
      .insert([
        {
          name: nome, // Mapeia req.body.nome para a coluna name
          age: age,
          species: species,
          breed: breed,
          description: description,
          imag_url: imagelink, // Mapeia req.body.imagelink para a coluna image_url
        },
      ])
      .select() // .select() faz com que o Supabase retorne o objeto recém-criado
      .single(); // .single() garante que pegamos apenas um objeto

    // Se o Supabase retornar um erro, jogue-o para o bloco catch
    if (error) {
      throw error;
    }

    // Se tudo der certo, retorna o novo animal criado com status 201 (Created)
    return res.status(201).json(data);
  } catch (error) {
    console.error("Erro ao criar animal:", error.message);
    return res.status(500).json({ error: "Erro interno ao criar o animal." });
  }
});
// Rota pra Editar um animal. Acesso só para adms
app.put("/pets/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, species, breed, description, imag_url, status } =
      req.body;

    const updateData = {
      name,
      age,
      species,
      breed,
      description,
      imag_url,
      status,
    };

    const { data, error } = await supabaseAdmin
      .from("pets")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error
    // Se o dado ser nulo signifca que ele não foi encontrado
    if (!data || data.length == 0) {
      return res.status(404).json({ error: 'Animal não encontrado.' });
    }
    return res.status(200).json(data);
  } catch (error) {
    console.error("Erro ao atualizar animal:", error.message);
    return res.status(500).json({ error: "Erro interno ao atualizar o animal." });
  }
});
// Rota pra Deleta um animal que ja foi adotado. Acesso só para adms
app.delete('/pets/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabaseAdmin
      .from('pets')
      .delete()
      .eq('id', id)
      .select();

    if (error) {
      throw error;
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Animal não encontrado.' });
    }

    return res.status(204).send();

  } catch (error) {
    console.error('Erro ao excluir animal:', error.message);
    return res.status(500).json({ error: 'Erro interno ao excluir o animal.' });
  }
});
// Rota para criar uma candidatura
app.post("/candidatura", async (req, res) => {
  try {
    const { petId, userId } = req.body;

    const { data, error } = await supabaseAdmin
      .from("adoption_applications")
      .insert([
        {
          pet_id: petId,
          user_id: userId,
          status: "pendente", // Define o status inicial como "pendente"
        }])
      .select()
      .single() // Pega apenas um objeto

    if (error) throw error;
    // Se tudo der certo, retorna a candidatura criada com status 201 (Created)
    return res.status(201).json(data);

  } catch (error) {
    console.error("Erro ao criar candidatura:", error.message);
    return res.status(500).json({ error: "Erro interno ao criar a candidatura." });
  }
});
// Rota para editar uma candidatura de um usuário específico. Acesso só para adms
app.put("/candidatura/:id", async (req, res) => {
  try {
    const { id } = req.params

    const updateCandidatura = { status };

    const { data, error } = await supabaseAdmin 
      .from("adoption_applications")
      .update(updateCandidatura)
      .eq("user_id",id)
      .select()
      .single();

    if (error) throw error
    // Se o dado ser nulo signifca que ele não foi encontrado
    if (!data || data.length == 0) {
      return res.status(404).json({ error: 'Candidatura não encontrada.' });
    }
    return res.status(200).json(data);
    

  } catch (error) {
    console.error("Erro ao atualizar candiatura:", error.message);
    return res.status(500).json({ error: "Erro interno ao atualizar candidatura." });
  }
});
// Rota pra Deleta um candidatura de um usuário específico
app.delete("/candidaturas/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabaseAdmin
      .from("adoption_applications")
      .delete()
      .eq("user_id",id)
      .select();

      if (error) throw error;

      if (!data || data.length === 0) return res.status(404).json({ error: "Nenhuma candidatura encontrada." });
      
      return res.status(200).json(data);

  } catch (error) {
    console.error("Erro ao buscar candidaturas:", error.message);
    return res.status(500).json({ error: "Não foi possível Deleta uma candidatura." });
  }
});
// Rota para listar todas as candidaturas de um usuário específico
app.get("/candidaturas/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabaseAdmin
      .from("adoption_applications")
      .select()
      .eq('user_id', id); // Corrigido para buscar por user_id

    if (error) throw error;

    if (!data || data.length === 0) {
      return res.status(404).json({ error: "Nenhuma candidatura encontrada." });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Erro ao buscar candidaturas:", error.message);
    return res.status(500).json({ error: "Erro interno ao buscar as candidaturas." });
  }
});
// Rota para listar TODAS as candidaturas pendentes Acesso só para adms
app.get("/candidatus", async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from("adoption_applications")
      .select(
        `
        id, status, application_date,
        pets (id, name),
        profiles (id, full_name)
      `
      )
      .eq("status", "pendente");

    if (error) throw error;
    return res.status(200).json(data);
  } catch (error) {
    console.error("Erro ao buscar candidaturas:", error.message);
    return res.status(500).json({ error: "Não foi possível buscar as candidaturas." });
  }
});

// Inicia o servidor
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});